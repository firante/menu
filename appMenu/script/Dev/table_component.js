/*
* component for generate menu table
*/

var ReactDOM = require('react-dom');
var React = require('react');
var Order = require('./order_component');
var FluxController = require('../resourse/fluxController');
var Menu = require('../resourse/content');
var Tr = require('./tr_table_component');

var ListStore = FluxController.ListStore;

var Table = React.createClass({

  componentDidMount: function() {
    ListStore.bind('change', this.changeOrder);
  },

  componentWillUnmount: function() {
    ListStore.unbind('change', this.changeOrder);
  },

  changeOrder: function () {
    ReactDOM.render(<Order orderList={ListStore.getOrder()} totalSuma={ListStore.getTotalAmount()} />, document.getElementById('order'));
  },
  handleClick: function() {
  },

  render: function () {
    var menuList = [];
    menuList = this.props.menu.map(function (value, index) {
      return (<Tr peair={value} index={index} key={index} />);
    });

    return (
      <div>
        <div className='header'>
          Меню
        </div>
        <div className='body'>
          <table>
            <thead>
              <tr>
                <td className='td_name'>Назва страви</td>
                <td className='td_other'>Кількість</td>
                <td className='td_other'>Ціна</td>
                <td className='td_other'></td>
              </tr>
            </thead>
            <tbody>
              {menuList}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});

module.exports = Table;
