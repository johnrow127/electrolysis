define(function(require){

    var Node = require('SCENERY/nodes/Node');
    var inherit = require('PHET_CORE/inherit');
    var Image = require('SCENERY/nodes/Image');
    var Rectangle = require('SCENERY/nodes/Rectangle');
    var Circle = require('SCENERY/nodes/Circle');
    var DownUpListener = require( 'SCENERY/input/DownUpListener' );

    var circuitImage = require('image!ELECTROLYSIS/circuit.svg');

    function CircuitNode(model, modelViewTransform) {
        Node.call(this, {x: 50, y: 100});

        var rectangleNode = new Rectangle(200,300,150,100,0,0,{fill: '#000', lineWidth: 0});
        this.addChild(rectangleNode);
        model.electrolyteProperty.link(function(liquid) {
            rectangleNode.fill = liquid ? liquid.color : 'red';
        }.bind(this));

        var key = new Circle(8, {x: 527, y: 171, fill: '#000', cursor: 'pointer', stroke: '#fff', lineWidth: 9});
        key.addInputListener(new DownUpListener({
            up: function() {
                model.openProperty.set(!model.open);
            }
        }));
        this.addChild(key);

        model.openProperty.link(function(open) {
            key.fill = open ? '#fff' : '#000';
        });

        var image = new Image(circuitImage, {x: 0, y: 0});
        this.addChild(image);
    }

    return inherit(Node, CircuitNode);
});
