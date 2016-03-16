var React = require('react');
var Tr = require('./tr_component');

var Table = React.createClass({
  render: function () {
    var menuList = [];
    menuList = this.props.menu.map(function (value, index) {
      return (<Tr peair={value} index={index} key={index} />);
    });

    return (
      <table>
        <tbody>
          {menuList}
        </tbody>
      </table>
    );
  }
});

module.exports = Table;
