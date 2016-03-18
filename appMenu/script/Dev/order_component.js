var ReactDOM = require('react-dom');
var React = require('react');
var Table = require('./table_component');
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
      return (

      );
    });
    return (
      <div className='div_order'>
        <div id='topdf' className='div_order'>
          <table className='order_table'>
            <thead>
              <tr>
                <td className='td_name'> Dish Name </td>
                <td className='td_small'> Count </td>
                <td className='td_small'> Price </td>
                <td className='td_small'> Total price </td>
              </tr>
            </thead>

            <tbody>
              {order_list}
            </tbody>
          </table>
          <br />
          <br />
          <span className='fullPrice'> Payable: {this.props.fullPrice} </span>
        </div>
        <br />
        <br />
        <div className='div_order'>
          <input
            className='butt_toMenu'
            type='button'
            value='To menu'
            onClick={this.handleToMenu} />
          <input
            className='butt_toPDF'
            type='button'
            value='To PDF'
            onClick={this.handleToPdf}
            />
        </div>
      </div>
    );
  }
});

module.exports = Order;
