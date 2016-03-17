var React = require('react');
var Obj = require('./tr_component');



var Table = React.createClass({

  handleClick: function() {
    alert(Obj.ListStore.getTotalAmount());
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

      <input type='button' value='but' onClick={this.handleClick} />
      </div>
    );
  }
});

module.exports = Table;
