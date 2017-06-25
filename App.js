var React = require('react');
var ReactDOM = require('react-dom');
var TrackList = require('./TrackList');
var Graphic = require('./Graphic');

module.exports = class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  setupAudio(drawUpdate) {
    var audio = require('./createAudioContext')(this.state.activeAudioEl);

    this.wireGraph(audio.audioSource, audio.processor, audio.analyser);

    audio.processor.onaudioprocess = drawUpdate.bind(this, audio.analyser, this.refs.graphic.refs.graphic.sprite.filters[0]);

    return Promise.resolve(audio.audioSource);
  }

  wireGraph(audioSource, processor, analyser) {
    audioSource.connect(analyser);
    audioSource.connect(audioSource.context.destination);

    processor.connect(audioSource.context.destination);
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
          drawUpdate={drawUpdate}
        />
        <TrackList
          tracks={this.props.tracks}
          setActiveAudioEl={this.setActiveAudioEl.bind(this)}
        />
      </div>
    );
  }
};

function drawUpdate(analyser, filter) {
  var dataArray = new Uint8Array(analyser.frequencyBinCount);

  analyser.getByteTimeDomainData(dataArray);

  for(var i = 0; i < analyser.frequencyBinCount; i++) {
    var desired = Math.sin((dataArray[i] - 130));

    filter.red = [desired * -5 , desired ];
    filter.green = [desired * 2, desired ];
    filter.blue = [-desired * 2 , desired ];
  }
}
