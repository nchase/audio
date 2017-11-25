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

    this.state = {
      activeTrack: {
        props: {}
      }
    };
  }

  setupAudio(drawUpdate) {
    this.setState({
      audio: require('./createAudioContext')(this.state.activeTrack.audioEl)
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

  togglePlayback() {
    if (this.state.activeTrack.audioEl.paused) {

      window.audioContext && window.audioContext.resume();
      return this.state.activeTrack.audioEl.play();
    }

    window.audioContext && window.audioContext.suspend();
    return this.state.activeTrack.audioEl.pause();
  }

  setActiveTrack(audioEl, trackProps) {
    this.setState({
      activeTrack: {
        props: trackProps,
        audioEl
      }
    }, function() {
      this.setupAudio(drawUpdate);
    });

  }

  render() {
    return (
      <div className="pv4 pa2 pa4-l center app">
        <div
          className="tr f4 pb4"
          contentEditable
        >
          Title
        </div>
        <div className="flex">
          <Graphic
            ref="graphic"
            className="db center pointer"
            src={this.state.activeTrack.props.imageSrc || this.props.imageSrc}
            onClick={this.togglePlayback.bind(this)}
          />
          <Slider
            className="slider slider--vertical w1 h-25 self-end
"
            target={this.state.audio && this.state.audio.audioContext.gainNode.gain}
            min={0.0}
            defaultValue={0.5}
            max={1.0}
            step={0.1}
          />
        </div>
        <TrackList
          className="pv4 center"
          tracks={this.props.tracks}
          setActiveTrack={this.setActiveTrack.bind(this)}
          togglePlayback={this.togglePlayback.bind(this)}
        />
      </div>
    );
  }
};

function drawUpdate(analyser, filter) {
  var dataArray = new Uint8Array(analyser.frequencyBinCount);

  analyser.getByteFrequencyData(dataArray);

  var minHz = this.state.activeTrack.props.minHz || 512
  var maxHz = this.state.activeTrack.props.maxHz || 2400

  var avg = average(analyser, dataArray, minHz, maxHz);

  updateFilter(avg, filter)
}

function updateFilter (value, filter) {
  filter.red = [value * -20, 0];
  filter.green = [value, value];
  filter.blue = [value, value];
}

var logger = _.throttle((...args) => { console.log(args) }, 60);
