var React = require('react');
var Dom = React.createElement;

module.exports = React.createClass({
    displayName: "Posts",
    render: function() {

        //A single virtual dom list item
        var createPost = function(itemText) {
            return Dom("li", null, itemText);
        };

        // Map each new ite element to the list
        return Dom("ul", null, this.props.items.map(createPost));
    }
});