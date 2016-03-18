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
   },
   addCount(payload) {
     var ind = ListStore.orderList.map(function(val) {return val.name; }).indexOf(payload.item.name);
     if(ind !== -1) {
       this.orderList[ind].count = +this.orderList[ind].count + +payload.item.count;
     } else {
       ListStore.orderList.push(payload.item);
     }
   },
   removeFood (payload) {
     var ind = this.orderList.map(function(val) {return val.name; }).indexOf(payload.item.name);
     this.orderList.splice(ind, 1);
   },
   decrCount(payload) {
     var ind = this.orderList.map(function(val) {return val.name; }).indexOf(payload.item.name);
     this.orderList[ind].count--;
     if(this.orderList[ind].count === 0) {
       this.removeFood(payload);
     }
   },

   incrCount(payload) {
     var ind = this.orderList.map(function(val) {return val.name; }).indexOf(payload.item.name);
     this.orderList[ind].count++;
   }
};

MicroEvent.mixin(ListStore);

AppDispatcher.register(function(payload) {
  switch (payload.eventName) {
    case "addFood":
      ListStore.addCount(payload)
      ListStore.trigger('change');
      break;
    case "removeFood":
      ListStore.removeFood(payload);
      ListStore.trigger('change');
      break;
    case "decrCount":
      ListStore.decrCount(payload);
      ListStore.trigger('change');
      break;
    case "incrCount":
      ListStore.incrCount(payload);
      ListStore.trigger('change');
      break;
    default:
      break;
  }
});

var Tr = React.createClass({
  handleChangeClick: function() {
    AppDispatcher.dispatch({
      eventName: 'addFood',
      item: {name: this.refs.name.innerText, count: this.refs.count.value, price: this.refs.price.innerText}
    });
  },

  render: function() {
    return (
      <tr>
      <td
        ref = 'name'>
        {this.props.peair.name}
      </td>
        <td>
          <input
            type="text"
            className="inp_count"
            defaultValue="1"
            ref = 'count'/>
        </td>
        <td
          ref = 'price'>
          {this.props.peair.price}
        </td>
        <td>
          <input
            type="button"
            value='Add'
            onClick={this.handleChangeClick}
            />
        </td>
      </tr>
    );
  }
});

module.exports = {"Tr": Tr, "ListStore": ListStore, 'Dispatcher': AppDispatcher};
