var React = require('react');
var Firebase = require('firebase');

/**
 *
 * A Component for displaying posts
 *
 *
*/

module.exports = React.createClass({
	displayName: 'Brogan',
	items: [],
	componentWillMount: function() {
	var items = [];
	  this.firebaseRef = new Firebase("https://nscleveland.firebaseio.com");
	  this.firebaseRef.on("child_added", function(dataSnapshot) {
	    this.items.push(dataSnapshot.val());
	    this.setState({
	      items: this.items
	    });
	  }.bind(this));
	},
	render: function(){
		this.props.items.foreach(function(item){
			console.log(item);
		});
		return React.createElement('div', 'null', 'Hello', this.props.items[0]);
	}
});