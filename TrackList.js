var React = require('react');
var ReactDOM = require('react-dom');
var Track = require('./Track');

module.exports = function TrackList (props) {
  return (
    <div
      className={props.className}
    >
      {
        props.tracks.map(function(track, index) {
          return (
            <Track
              key={track.source}
              src={track.source}
              index={index + 1}
              setActiveTrack={props.setActiveTrack}
              togglePlayback={props.togglePlayback}
              {...track}
            />
          );
        })
      }
    </div>
  );
};
