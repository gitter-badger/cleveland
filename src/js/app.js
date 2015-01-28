'use strict'
var React = require('react');
//var $ = require('jquery');
var Posts = require('./components/posts.js');

React.render(React.createElement(Posts, {displayName: 'Jack Vial!'}), document.getElementById('display-posts'));