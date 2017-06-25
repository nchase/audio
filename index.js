var React = require('react');
var ReactDOM = require('react-dom');
require('./index.css');

var App = require('./App');

ReactDOM.render(
  <App
    imageSrc="./images/IMG_0204_resized.jpg"
    tracks={[
      "./audio/06-10-2017.mp3",
      "./audio/lies-loop.mp3"
    ]}
  />,
  document.getElementById('app')
)
