var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');
var TrackList = require('./TrackList');
var Graphic = require('./Graphic');
var Slider = require('./Slider');
var average = require('analyser-frequency-average');

module.exports = class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  setupAudio(drawUpdate) {
    this.setState({
      audio: require('./createAudioContext')(this.state.activeAudioEl)
    }, function() {
      this.wireGraph(this.state.audio.audioSource, this.state.audio.processor, this.state.audio.analyser);

      this.state.audio.processor.onaudioprocess = drawUpdate.bind(this, this.state.audio.analyser, this.refs.graphic.refs.graphic.sprite.filters[0]);
    }.bind(this));
  }

  wireGraph(audioSource, processor, analyser) {
    audioSource.connect(analyser);
    audioSource.connect(audioSource.context.destination);

    processor.connect(audioSource.context.destination);
  }

  setPlayState(playState) {
    this.setState({
      playing: playState
    });
  }

  setActiveAudioEl(audioEl) {
    this.setState({
      activeAudioEl: audioEl
    }, function() {
      this.setupAudio(drawUpdate);
    });

  }

  render() {
    return (
      <div className="pv4 pa2 pa4-l center app">
        <div
          className="tr f4 pb4"
        >
          Title
        </div>
        <Graphic
          ref="graphic"
          className="db center"
          src={this.props.imageSrc}
        />
        <TrackList
          tracks={this.props.tracks}
          setActiveAudioEl={this.setActiveAudioEl.bind(this)}
          setPlayState={this.setPlayState.bind(this)}
          playing={this.state.playing}
        />
        <Slider
          target={this.state.audio && this.state.audio.audioContext.gainNode.gain}
          defaultValue={0}
          max={11}
        />
      </div>
    );
  }
};

function drawUpdate(analyser, filter) {
  if (!this.state.playing) {
    return false;
  }
  var dataArray = new Uint8Array(analyser.frequencyBinCount);

  analyser.getByteFrequencyData(dataArray);

  // this should be per-track configuration:
  var minHz = 512
  var maxHz = 2400

  var avg = average(analyser, dataArray, minHz, maxHz);


  updateFilter(avg, filter)
}

function updateFilter (value, filter) {
  filter.red = [value * -20, 0];
  filter.green = [value, value];
  filter.blue = [value, value];
}

var logger = _.throttle(function(value) {console.log(value) }, 60);
