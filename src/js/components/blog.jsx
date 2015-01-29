var React = require('react');
var Firebase = require('firebase');
var Dom = React.createElement;

var Posts = require('./posts.jsx');

module.exports = React.createClass({

    // Set the initial state before populating with data
    getInitialState: function() {
        // Items needs to be accessible throughout the object
        this.items = [];
        return {
            items: [],
            postTitle: '',
            text: ''

        };
    },

    // Write the post to firebase
    componentWillMount: function() {
        this.firebaseRef = new Firebase("https://nscleveland.firebaseio.com/posts/");
        this.firebaseRef.limitToLast(25).on("child_added", function(dataSnapshot) {

            // Only keep track of 25 items at a time
            if (this.items.length === 25) {
                this.items.splice(0, 1);
            }

            this.items.push(dataSnapshot.val());
            this.setState({
                items: this.items
            });
        }.bind(this));
    },

    componentWillUnmount: function() {
        this.firebaseRef.off();
    },

    onChange: function(e) {
        console.log(e.target.value);
        this.setState({
            text: e.target.value
        });
    },

    onTitleChange: function(e) {
        console.log(e.target.value);
        this.setState({
            postTitle: e.target.value
        });
    },

    handleSubmit: function(e) {
        e.preventDefault();
        if (this.state.text && this.state.text.trim().length !== 0) {
            this.firebaseRef.push({
                text: this.state.text,
                postTitle: this.state.postTitle
            });
            this.setState({
                text: "",
                postTitle: ""
            });
        }
    },
    render: function() {
        return (
            <div>
                <h3>Posts</h3>
                <Posts items={this.state.items} />
                <form onSubmit={this.handleSubmit} >
                    <input onChange={this.onTitleChange} value={this.state.postTitle} />
                    <input onChange={this.onChange} value={this.state.text} />
                    <button>{'Add Post#' + (this.state.items.length + 1)}</button>
                </form>
            </div>
        );
    }
});
