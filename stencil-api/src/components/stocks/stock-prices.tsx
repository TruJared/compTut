import { Component, State, Element, Prop, Watch, Listen } from '@stencil/core';
import { STOCK_KEY } from '../../utils/private';
// https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=demo //

@Component({
  tag: 'jt-stock-prices',
  styleUrl: './stock-prices.css',
  shadow: true,
})
export class StockPrice {
  // two ways to access shadow DOM elements
  // #region
  //  *  this connects to appropriate HTML element as a "ref attribute"  *  //
  //  *  see <input> below  *  //
  stockInput: HTMLInputElement;

  //  *  can declare and element from inside the class  *  //
  //  *  useful for shadow DOM -> see private methods  *  //
  @Element() el: HTMLElement;

  // #endregion

  @State() fetchedPrice = '0';
  //  two way data binding  //
  @State() stockUserInput: string;
  @State() stockInputValid = false;
  @State() error: string;
  @State() loading = false;

  @Prop({ mutable: true, reflectToAttr: true }) stockSymbol = 'ibm';

  @Watch('stockSymbol')
  stockSymbolChanged(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.fetchedPrice = '💸';
      this.fetchStockPrice();
    }
  }

  @Listen('body:jtSymbolSelected')
  onStockSymbolSelected(event: CustomEvent) {
    console.log('works');
    if (event.detail && event.detail !== this.stockSymbol) {
      this.stockSymbol = event.detail;
      this.fetchStockPrice();
    }
  }

  //  private methods  //
  fetchStockPrice() {
    this.loading = true;

    fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${
        this.stockSymbol
      }&apikey=${STOCK_KEY}`,
    )
      .then(res => res.json())
      .then(parsedRes => {
        if (!parsedRes['Global Quote']['05. price']) {
          throw new Error('😓');
        } else {
          this.fetchedPrice = `$${parsedRes['Global Quote']['05. price'].slice(
            0,
            -2,
          )}`;
          this.loading = false;
        }
      })
      .catch(err => {
        this.error = err.message;
        this.loading = false;
      });
  }

  onFetchStockPrice(event: Event) {
    //  *  if getting value using @Element()  *  //
    // const stockSymbol = (this.el.shadowRoot.querySelector(
    //   '#stock-symbol',
    // ) as HTMLInputElement).value;

    event.preventDefault();
    // clear error //
    this.error = null;
    //  *   this will trigger the @Watch event  *  //
    this.stockSymbol = this.stockInput.value;
  }

  onUserInput(event: Event) {
    this.stockUserInput = (event.target as HTMLInputElement).value;
    if (
      this.stockUserInput.trim().length >= 3 &&
      this.stockUserInput.trim().length <= 6
    ) {
      this.stockInputValid = true;
    } else {
      this.stockInputValid = false;
    }
  }

  //  hooks  //
  // https://stenciljs.com/docs/component-lifecycle/
  componentDidLoad() {
    if (this.stockSymbol) {
      this.fetchStockPrice();
    }
  }

  // if error add class error to custom element //
  hostData() {
    return { class: this.error ? 'error' : '' };
  }

  render() {
    let dataContent = (
      <p id="price">
        {this.stockSymbol.toUpperCase()}: {this.fetchedPrice}
      </p>
    );

    if (this.error) {
      dataContent = <p id="price">{this.error}</p>;
    }

    //  *  adds loading spinner - removed because of css  *  //
    // if (this.loading) {
    //   dataContent = (
    //     <div class="lds-ellipsis">
    //       <div />
    //       <div />
    //       <div />
    //       <div />
    //     </div>
    //   );
    // }

    return [
      <div class="dataContent">{dataContent}</div>,
      <form id="get-price" onSubmit={this.onFetchStockPrice.bind(this)}>
        <input
          id="stock-symbol"
          type="text"
          required
          ref={el => (this.stockInput = el)}
          value={this.stockUserInput}
          onInput={this.onUserInput.bind(this)}
        />
        <span class="floating-label">symbol</span>
        <br />
        <button
          id="stock-submit-btn"
          type="submit"
          disabled={!this.stockInputValid || this.loading}
        >
          🤑
        </button>
      </form>,
    ];
  }
}
