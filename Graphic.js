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
    graphic.scale.x = 0.8;
    graphic.scale.y = 0.8;
    graphic.filters = [new PIXI.filters.RGBSplitFilter()]
    graphic.filters[0].red = graphic.filters[0].blue = graphic.filters[0].green = [0, 0];

    this.stage = new PIXI.Container();
    this.stage.addChild(graphic);

    return graphic;
  }

  componentWillUpdate() {
    this.handleGraphicUpdate(this.props.src);
  }

  componentDidMount() {
    this.renderer = PIXI.autoDetectRenderer(640, 500);
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
