var ReactDOM = require('react-dom');
var React = require('react');
var Tr_Order = require('./tr_order_component');
var Menu = require('../resourse/content');
var Obj = require('./tr_table_component');

var ListStore = Obj.ListStore;


var Order = React.createClass({

  handleToPdf: function() {

    var arr = [
      [
        {text:'Назва товару', alignment : 'left', fillColor: 'grey'},
        {text: 'Кількість', alignment : 'center', fillColor: 'grey'},
        {text: 'Ціна', alignment : 'center', fillColor: 'grey'},
        {text: 'Сума', alignment : 'center', fillColor: 'grey'}
      ]
    ];
    ListStore.getOrder().forEach(function(value) {
      var total = +value.count * +value.price;
      arr.push(
        [
          value.name.toString(),
          {text: value.count.toString(), alignment : 'center'},
          {text: value.price.toString(), alignment : 'center'},
          {text: total.toString(), alignment : 'center'}
        ]
      );
    });
    var docDefinition = {
      pageMargins: [ 80, 50, 80, 50 ],
      content: [
        {
          alignment : 'center',
          columns: [
            {
              text: 'РАХУНОК',
              bold: true
            }
          ]
        },
        {
          table: {
            headerRows: 1,
            widths: ['55%','15%','15%','15%'],
            body: arr
          }
        },
        {
          columns: [
            {
              alignment: 'right',
              margin: [0, 25, 0, 0],
              text: 'До оплати: ' + ListStore.getTotalAmount().toString(),
              bold: true
            }
          ]
        }
      ]
    };
    pdfMake.createPdf(docDefinition).download('order.pdf');
  },

  render: function() {
    var order_list = this.props.orderList.map(function(value, index) {
      return (<Tr_Order order={value} key={index} />);
    });
    return (
      <div>
        <div className='header'>
          Замовлення
        </div>
        <div className='body'>
          <table className='table_order'>
            <thead>
              <tr>
                <td>Назва страви</td>
                <td>Кількість</td>
                <td>Ціна</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {order_list}
              <tr id='totalsuma'>
                <td>До сплати: </td>
                <td></td>
                <td>{this.props.totalSuma}</td>
                <td></td>
              </tr>
              <tr id='topdf'>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <input
                    className='buttToPdf'
                    type='button'
                    value='toPdf'
                    onClick={this.handleToPdf}/>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});

module.exports = Order;
