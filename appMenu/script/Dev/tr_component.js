var React = require('react');
var Dispatcher = require('../resourse/Dispatcher');
var MicroEvent = require('../resourse/microevent');

var AppDispatcher = new Dispatcher();

var ListStore = {
  orderList: [],

  getOrder: function() {
    return this.orderList;
  }
};

MicroEvent.mixin(ListStore);

AppDispatcher.register(function(payload) {
  switch (payload.eventName) {
    case "addFood":
      ListStore.orderList.push(payload.itemFood);
      break;
    case "removeFood":
      var ind = ListStore.orderList.map(function(val) {return val.name; }).indexOf(payload.itemFood.name);
      ListStore.orderList.splice(ind, 1);
      break;
    default:

  }
});

var Tr = React.createClass({
  handleChange: function() {
    if(this.refs.checks.checked) {
      AppDispatcher.dispatch({
        eventName: 'addFood',
        itemFood: {name: this.refs.name.innerText, count: this.refs.count.value, price: this.refs.price.innerText}
      });
    } else {
      AppDispatcher.dispatch({
        eventName: 'removeFood',
        itemFood: {name: this.refs.name.innerText}
      });
    }
  },

  render: function() {
    return (
      <tr>
        <td>
          <input
            type="checkbox"
            onChange={this.handleChange}
            ref = 'checks'
            />
        </td>
        <td>
          <input
            type="text"
            className="count"
            defaultValue="1"
            ref = 'count' />
        </td>
        <td
          ref = 'name'>

          {this.props.peair.name}
        </td>
        <td
          ref = 'price'>

          {this.props.peair.price}
        </td>
      </tr>
    );
  }
});

module.exports = {"Tr": Tr, "ListStore": ListStore};
