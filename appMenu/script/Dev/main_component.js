var ReactDOM = require('react-dom');
var React = require('react');
var Table = require('./table_component');
var Menu = require('../resourse/content');

ReactDOM.render(<Table menu={Menu} />, document.getElementById('content'));
