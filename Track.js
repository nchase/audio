var React = require('react');
var ReactDOM = require('react-dom');
var moment = require('moment');

module.exports = class Track extends React.Component {
  changePlayback() {
    if (this.refs.audioEl.paused) {

      this.props.setActiveTrack(this.refs.audioEl, this.props);

      this.props.setPlayState(true);

      window.audioContext && window.audioContext.resume();
      return this.refs.audioEl.play();
    }

    this.props.setPlayState(false);

    window.audioContext && window.audioContext.suspend();
    return this.refs.audioEl.pause();
  }

  handleTimeUpdate(event) {
    this.setState({
      progress: `${this.refs.audioEl.currentTime / this.refs.audioEl.duration * 100}%`
    });
  }

  changeCurrentTime(event) {
    if (this.refs.audioEl.paused) {
      return false;
    }

    var progressBarElDims = event.currentTarget.getBoundingClientRect()

    var desiredDistance = (event.clientX - progressBarElDims.left);

    var distanceRatio = desiredDistance / progressBarElDims.width;

    return this.refs.audioEl.currentTime = (distanceRatio * this.refs.audioEl.duration);
  }

  constructor(props) {
    super(props);

    this.state = {
      progress: 0
    };
  }

  componentDidMount() {
    this.refs.audioEl.addEventListener('timeupdate', this.handleTimeUpdate.bind(this));
    this.refs.audioEl.volume = 0.25
  }

  componentWillUnmount() {
    this.refs.audioEl.removeEventListener('timeupdate');
  }

  renderCurrentTime() {
    if (!this.refs.audioEl) {
      return '00:00';
    }

    return `${moment.utc(this.refs.audioEl.currentTime * 1000).format('mm:ss')}`;
  }

  renderDuration() {
    if (!this.refs.audioEl) {
      return '00:00';
    }

    return `${moment.utc(this.refs.audioEl.duration * 1000).format('mm:ss')}`;
  }

  renderPlayState() {
    if (this.refs.audioEl && !this.refs.audioEl.paused) {
      return '-';
    }

    return '>'
  }

  render() {
    return (
      <div
        className="pointer flex-ns items-center justify-between mb3"
      >
        <div
          onClick={this.changePlayback.bind(this)}
          className="flex w-100"
        >
          <div
            className="mr3"
            style={{
              fontFamily: 'monospace',
              fontSize: '16px'
            }}
          >
            {this.renderPlayState()}
          </div>

          <div className="w-100">
            Track {this.props.index}
          </div>

          <div className="w-100 nowrap">
            {
              `${this.renderCurrentTime()}
               /
               ${this.renderDuration()}`
            }
          </div>
        </div>
        <div
          className="bg-gray w-100 h1"
          onMouseDown={this.changeCurrentTime.bind(this)}
        >
          <div
            className="bg-black h-100"
            style={{
              width: this.state.progress,
            }}
          />
        </div>
        <audio
          ref="audioEl"
          className="dn"
          src={this.props.src}
          data-default-gain={this.props.defaultGain}
          loop
          controls
        />
      </div>
    );
  }
};
