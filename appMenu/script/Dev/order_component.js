var ReactDOM = require('react-dom');
var React = require('react');
var Tr_Order = require('./tr_order_component');
var Menu = require('../resourse/content');


var Order = React.createClass({

  handleToPdf: function() {
    var pdf = new jsPDF('p', 'pt', 'letter');
    var source = $('#topdf').html();
    var specialElementHandlers = {
          '#bypassme': function (element, renderer) {
              return true;
          }
      },
      margins = {
          top: 20,
          bottom: 20,
          left: 20,
          right: 20
      };
      pdf.setFont("Times-Roman");
      pdf.setFontType("bold");
      pdf.setFontSize(9);
      pdf.setFontStyle('italic');
      pdf.fromHTML( source, margins.left, margins.top,
              {
                  'width': margins.width,
                  'elementHandlers': specialElementHandlers
              },
      function (dispose) {
          pdf.save('Order.pdf');
      }, margins);
  },

  render: function() {
    var order_list = this.props.orderList.map(function(value, index) {
      return (<Tr_Order order={value} key={index} />);
    });
    return (
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Count</td>
            <td>Price</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {order_list}
          <tr id='totalsuma'>
            <td>Total suma: </td>
            <td></td>
            <td>{this.props.totalSuma}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    );
  }
});

module.exports = Order;
