var React = require('react');
var Tr_table = require('./tr_table_component');

var AppDispatcher = Tr_table.Dispatcher;
var ListStore = Tr_table.ListStore;

var Tr_Order = React.createClass({

  handleClick: function() {
    AppDispatcher.dispatch({
      eventName: 'removeFood',
      item: {name: this.refs.name.innerText}
    });
  },

  decrCount: function() {
    AppDispatcher.dispatch({
      eventName: 'decrCount',
      item: {name: this.refs.name.innerText}
    });
  },

  incrCount: function() {
    AppDispatcher.dispatch({
      eventName: 'incrCount',
      item: {name: this.refs.name.innerText}
    });
  },

  render: function() {
    return (
      <tr>
        <td
          ref='name'>
          {this.props.order.name}
        </td>
        <td>
          <span
            onClick={this.decrCount}>-</span>
          <span>{this.props.order.count}</span>
          <span onClick={this.incrCount}>+</span>
        </td>
        <td>{this.props.order.count*this.props.order.price}</td>
        <td>
          <input
            type='button'
            value='X'
            onClick={this.handleClick}/>
        </td>
      </tr>
    );
  }
});

module.exports = Tr_Order;
