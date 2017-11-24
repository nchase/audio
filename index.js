var React = require('react');
var ReactDOM = require('react-dom');
require('./index.css');

var App = require('./App');

ReactDOM.render(
  <App
    imageSrc="./images/IMG_0204_resized.jpg"
    tracks={[
      {
        minHz: 512,
        maxHz: 2400,
        source: "./audio/06-10-2017.mp3",
      },
      {
        minHz: 0,
        maxHz: 1200,
        source: "./audio/lies-loop.mp3"
      }
    ]}
  />,
  document.getElementById('app')
)
