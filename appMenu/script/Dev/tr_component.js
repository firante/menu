var React = require('react');
var Dispatcher = require('../resourse/Dispatcher');
var MicroEvent = require('../resourse/microevent');

var AppDispatcher = new Dispatcher();

var ListStore = {
  orderList: [],

  getOrder: function() {
    return this.orderList;
  },

   getTotalAmount() {
     var t_amount = 0;
     this.orderList.forEach(function(value) {
       t_amount += parseInt(value.price, 10)*parseInt(value.count, 10);
     });
     return t_amount;
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
    case "changeCount":
      ListStore.orderList = ListStore.orderList.map(function(val) {
        if(val.name == payload.itemFood.name) {
          val.count = payload.itemFood.count;
          return val;
        } else {
          return val;
        }
      });
      break;
    default:

  }
});

var Tr = React.createClass({
  handleChangeCheck: function() {
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

  handleChangeCount: function() {
    AppDispatcher.dispatch({
      eventName: 'changeCount',
      itemFood: {name: this.refs.name.innerText, count: this.refs.count.value}
    });
  },

  render: function() {
    return (
      <tr>
        <td>
          <input
            type="checkbox"
            onChange={this.handleChangeCheck}
            ref = 'checks'
            />
        </td>
        <td>
          <input
            type="text"
            className="inp_count"
            defaultValue="1"
            ref = 'count'
            onChange={this.handleChangeCount}/>
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
