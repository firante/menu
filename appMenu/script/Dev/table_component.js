var React = require('react');
var ReactDOM = require('react-dom');
var Order = require('./order_component');
var Obj = require('./tr_component');



var Table = React.createClass({

  componentDidMount: function() {
    Obj.ListStore.bind('change', this.change);
  },

  componentWillUnmount: function() {
    Obj.ListStore.bind('change', this.change);
  },

  change: function () {
    Obj.ListStore.orderList.forEach(function(value) { alert(value.name); });
  },

  handleClick: function() {
    ReactDOM.render(<Order orderList={Obj.ListStore.getOrder()} fullPrice={Obj.ListStore.getTotalAmount()} />,
      document.getElementById('content'));
  },

  render: function () {
    var menuList = [];
    menuList = this.props.menu.map(function (value, index) {
      return (<Obj.Tr peair={value} index={index} key={index} />);
    });

    return (
      <div>
      <table>
        <tbody>
          {menuList}
        </tbody>
      </table>

      <input type='button' value='Order' onClick={this.handleClick} />
      </div>
    );
  }
});

module.exports = Table;
