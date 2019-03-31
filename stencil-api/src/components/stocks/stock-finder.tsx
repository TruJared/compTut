import { Component, State, Event, EventEmitter } from '@stencil/core';
import { STOCK_KEY } from '../../utils/private';

@Component({
  tag: 'jt-stock-finder',
  styleUrl: './stock-prices.css',
  shadow: true,
})
export class StockFinder {
  stockNameInput: HTMLInputElement;

  @State() searchResults: { symbol: string; name: string }[] = [];

  // custom event emitter //
  // https://stenciljs.com/docs/events/ //
  @Event({ bubbles: true, composed: true }) jtSymbolSelected: EventEmitter<
    string
  >;

  onFindStocks(event: Event) {
    const stockName = (this.stockNameInput as HTMLInputElement).value;
    event.preventDefault();
    fetch(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${STOCK_KEY}`,
    )
      .then(res => res.json())
      .then(
        parsedRes =>
          (this.searchResults = parsedRes.bestMatches.map(match => ({
            name: match['2. name'],
            symbol: match['1. symbol'],
          }))),
      )
      .catch(err => console.log(err));
  }

  onSelectSymbol(symbol: string) {
    this.jtSymbolSelected.emit(symbol);
  }

  render() {
    return [
      <div class="search">
        <p>Search:</p>
        <form id="search-form" onSubmit={this.onFindStocks.bind(this)}>
          <input
            id="find-symbol"
            type="text"
            required
            ref={el => (this.stockNameInput = el)}
          />
          <button id="search-form-btn" type="submit">
            GO
          </button>
        </form>
      </div>,
      <div class="floating-list">
        <ul class="stock-lists">
          {this.searchResults.map(result => (
            <li
              class="stock-list-symbol"
              onClick={this.onSelectSymbol.bind(this, result.symbol)}
            >
              {result.symbol}
            </li>
          ))}
        </ul>
      </div>,
    ];
  }
}
