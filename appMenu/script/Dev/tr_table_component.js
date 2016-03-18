/*
* component for generate tr list for menu table
*/

var React = require('react');
var FluxController = require('../resourse/fluxController');

var AppDispatcher = FluxController.Dispatcher;

var Tr = React.createClass({
  handleAddClick: function() {
    AppDispatcher.dispatch({
      eventName: 'addFood',
      item: {name: this.refs.name.innerText, count: this.refs.count.value, price: this.refs.price.innerText}
    });
  },

  render: function() {
    return (
      <tr>
        <td
          className='td_name'
          ref = 'name'>
          {this.props.peair.name}
        </td>
        <td
          className='td_other'>
          <input
            type="text"
            className="inp_count"
            defaultValue="1"
            ref = 'count'/>
        </td>
        <td
          className='td_other'
          ref = 'price'>
          {this.props.peair.price}
        </td>
        <td
          className='td_other'>
          <input
            className='buttAdd'
            type="button"
            value='Add'
            onClick={this.handleAddClick}
            />
        </td>
      </tr>
    );
  }
});

module.exports = Tr;
