var React = require('react');
var ReactDOM = require('react-dom');
var TrackList = require('./TrackList');

module.exports = function(props) {
  return (
    <div className="pv4 pa2 pa4-l center app">
      <div
        className="tr f4 pb4"
      >
        Title
      </div>
      <img
        src={props.imageSrc}
        className="db center"
        style={{
          maxHeight: '70vh'
        }}
      />
      <TrackList tracks={props.tracks} />
    </div>
  );
};
