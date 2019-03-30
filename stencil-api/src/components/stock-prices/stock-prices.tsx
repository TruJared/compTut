import { Component } from '@stencil/core';
// 2LJ7623Y2P83D04T //
// https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=demo //

@Component({
  tag: 'jt-stock-prices',
  styleUrl: './stock-prices.css',
  shadow: true,
})
export class StockPrice {
  //  private methods  //
  onFetchStockPrice(event: Event) {
    event.preventDefault();
    console.log('works');
  }

  render() {
    return [
      <div>
        <p id="price">Price: $0</p>
      </div>,
      <form onSubmit={this.onFetchStockPrice}>
        <input id="stock-symbol" type="text" placeholder="symbol" />
        <br />
        <button id="stock-submit-btn" type="submit">
          🤑
        </button>
      </form>,
    ];
  }
}
