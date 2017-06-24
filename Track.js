var React = require('react');
var ReactDOM = require('react-dom');
var moment = require('moment');

module.exports = class Track extends React.Component {
  changePlayback() {
    if (this.refs.audioEl.paused) {

      this.props.setActiveAudioEl(this.refs.audioEl);

      return this.refs.audioEl.play();
    }


    return this.refs.audioEl.pause();
  }

  handleTimeUpdate(event) {
    this.setState({
      progress: `${this.refs.audioEl.currentTime / this.refs.audioEl.duration * 100}%`
    });
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

  render() {
    return (
      <div
        className="pointer flex items-center justify-between"
        onClick={this.changePlayback.bind(this)}
      >
        <div>
          Track {this.props.index}
        </div>
        {
          `${this.renderCurrentTime()}
           /
           ${this.renderDuration()}`
        }
        <div
          className="w-50 bg-gray"
          style={{height: '4px' }}
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
          loop
          controls
        />
      </div>
    );
  }
};
