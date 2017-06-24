var React = require('react');
var ReactDOM = require('react-dom');
var Track = require('./Track');

module.exports = function TrackList (props) {
  return (
    <div
      className="pv5 center"
    >
      {
        props.tracks.map(function(src, index) {
          return ( <Track key={src} src={src} index={index + 1} /> );
        })
      }
    </div>
  );
};
