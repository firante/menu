/*
* component for generate tr list for order table
*/

var React = require('react');
var FluxController = require('../resourse/fluxController');

var AppDispatcher = FluxController.Dispatcher;
var ListStore = FluxController.ListStore;

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
          <input
            type='button'
            className='buttMinus'
            value='-'
            onClick={this.decrCount} />
          <span>{this.props.order.count}</span>
          <input
            type='button'
            value='+'
            className='buttPlus'
            onClick={this.incrCount} />
        </td>
        <td>{this.props.order.count*this.props.order.price}</td>
        <td>
          <input
            className='buttRemove'
            type='button'
            value='+'
            onClick={this.handleClick}/>
        </td>
      </tr>
    );
  }
});

module.exports = Tr_Order;
