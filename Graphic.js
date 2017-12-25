var React = require('react');
var ReactDOM = require('react-dom');
var PIXI = require('pixi.js');
require('pixi-filters');

module.exports = class Graphic extends React.Component {
  constructor(props) {
    super(props);

    this.animate = this.animate.bind(this);
  }

  handleGraphicUpdate(src) {
    var graphic = this.refs.graphic.sprite = PIXI.Sprite.fromImage(src);
    graphic.width = this.windowWidth;
    graphic.height= this.windowHeight;
    graphic.filters = [new PIXI.filters.RGBSplitFilter()]
    graphic.filters[0].red = graphic.filters[0].blue = graphic.filters[0].green = [0, 0];

    this.stage = new PIXI.Container();
    this.stage.addChild(graphic);

    var canvas = document.getElementsByTagName('canvas')[0];

    canvas.width = this.windowWidth;
    canvas.height = this.windowHeight;

    return graphic;
  }

  componentWillUpdate() {
    this.handleGraphicUpdate(this.props.src);
  }

  componentDidMount() {
    this.windowWidth = calculateWidth(window.innerWidth);

    this.windowHeight = calculateHeight(this.windowWidth);

    if (this.props.resize) {
      var imageEl = new Image();
      imageEl.src = this.props.src;

      return imageEl.onload = function() {
        this.windowWidth = imageEl.width;
        this.windowHeight = imageEl.height;

        this.renderer = PIXI.autoDetectRenderer(this.windowWidth, this.windowHeight);
        this.refs.graphic.appendChild(this.renderer.view);

        this.handleGraphicUpdate(this.props.src);

        this.animate();
      }.bind(this)
    }


    this.renderer = PIXI.autoDetectRenderer(this.windowWidth, this.windowHeight);
    this.refs.graphic.appendChild(this.renderer.view);

    this.handleGraphicUpdate(this.props.src);

    this.animate();
  }

  animate() {
    this.renderer.render(this.stage);
    this.frame = requestAnimationFrame(this.animate);
  }

  render() {
    return (
      <div
        ref="graphic"
        {...this.props}
      />
    );
  }
};

function calculateWidth(windowWidth) {
  if (windowWidth >= 640) {
    return 640;
  }

  return window.innerWidth - 32;
}

function calculateHeight(width) {
  return width * 0.78125;
}
