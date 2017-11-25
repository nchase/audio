var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');

module.exports = function Slider (props) {
  return (
    <input
      type="range"
      onChange={_.partialRight(onChange, props.target)}
      {...props}
    />
  );
};

function onChange(event, target) {
  if (!target) {
    return false;
  }

  return target.value = event.target.value;
}
