var React = require('react');
var ReactDOM = require('react-dom');
require('./index.css');

var App = require('./App');

ReactDOM.render(
  <App
    imageSrc="./images/IMG_0204_resized.jpg"
  />,
  document.getElementById('app')
)
