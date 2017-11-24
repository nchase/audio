var React = require('react');
var ReactDOM = require('react-dom');
var Track = require('./Track');

module.exports = function TrackList (props) {
  return (
    <div
      className="pv5 center"
    >
      {
        props.tracks.map(function(track, index) {
          return (
            <Track
              key={track.source}
              src={track.source}
              index={index + 1}
              setActiveTrack={props.setActiveTrack}
              playing={props.playing}
              setPlayState={props.setPlayState}
              {...track}
            />
          );
        })
      }
    </div>
  );
};
