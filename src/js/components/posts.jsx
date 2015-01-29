var React = require('react');
var Dom = React.createElement;

var PostHeading = React.createClass({
	render: function(){
		return (<h1>{this.props.postTitle}</h1>);
	}
});

var PostBody = React.createClass({
	render: function(){
		return (<p>{this.props.bodyText}</p>);
	}
});

var SinglePost = React.createClass({
	render: function(){
		return (
			<li>
				<div>
					<PostHeading postTitle={this.props.postTitle}/>
					<PostBody bodyText={this.props.itemText}/>
				</div>
			</li>
		);
	}
});

module.exports = React.createClass({
    render: function() {

    	var rows = [];

    	this.props.items.forEach(function (post) {
    		console.log('this is the post:', post);
    		rows.push(<SinglePost postTitle={post.postTitle} itemText={post.text}/>);
    	});

        // Map each new item element to the list
        // Accepts each item in the callback
        return (<ul>{rows}</ul>);
    }
});