//  !  good info  !  //
// https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements //

class Tooltip extends HTMLElement {
  constructor() {
    super();
    // vars //
    this._tooltipIcon;
    this._tooltipText = 'words n stuff';
    this._tooltipVisible = false;

    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
        <style>
            div {
                background-color: lightslategrey;
                color: white;
                position: absolute;
                left: 100%;
                padding: 5px;
                width: 100%;
                z-index: 10;
                font-weight: 200;
                margin-left: 5px;
                border-radius: 5px;
                text-align: center;
                box-shadow: 1px 1px 6px rgba(0,0,0,0.5);
            }

            :host {
              background: #aac;
              position: relative;
            }

            :host(.from-host) {
              background: #bada55;
            }

            .icon {
              font-weight: strong;
              background: blue;
              color: white;
              padding: 3px 10px;
              border-radius: 50%;
            }
        </style>
        <slot>Some default text</slot>
        <span class="icon">ℹ️</span>
    `;
  }

  // steps out of shadow DOM and into light DOM
  connectedCallback() {
    if (this.hasAttribute('text')) {
      this._tooltipText = this.getAttribute('text');
    }
    this._tooltipIcon = this.shadowRoot.querySelector('span');
    this._tooltipIcon.addEventListener(
      'mouseenter',
      this._showTooltip.bind(this),
    );
    this._tooltipIcon.addEventListener(
      'mouseleave',
      this._hideTooltip.bind(this),
    );
    this._render();
  }

  // executes AFTER element is removed from DOM
  //  !  include this to keep site performant  !  //
  // i.e. end a http request, turn off listeners, etc...
  disconnectedCallback() {
    this._tooltipIcon.removeEventListener('mouseenter', this._showTooltip);
    this._tooltipIcon.removeEventListener('mouseleave', this._hideTooltip);
  }

  // #region
  //  !  open dev tools and change text attribute in uc-tooltip  !  //
  //  *  this demonstrates updating the client 'live' based on user input  *  //
  attributeChangedCallback(name, oldValue, newValue) {
    //  ?  did user 🤡 just enter duplicate info  ?  //
    if (oldValue === newValue) {
      return;
    }
    // check attribute -> could use switch as well
    if (name === 'text') {
      this._tooltipText = newValue;
    }
  }

  // static getter method
  // static --> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static
  // getter --> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
  static get observedAttributes() {
    return ['text'];
  }
  // #endregion

  //  *  render is NOT a reserved method name  *  //
  //  *  can be called anything  *  //
  _render() {
    let tooltipContainer = this.shadowRoot.querySelector('div');
    if (this._tooltipVisible) {
      tooltipContainer = document.createElement('div');
      tooltipContainer.textContent = this._tooltipText;
      this.shadowRoot.appendChild(tooltipContainer);
    } else if (tooltipContainer) {
      this.shadowRoot.removeChild(tooltipContainer);
    }
  }

  _showTooltip() {
    this._tooltipVisible = true;
    this._render();
  }

  _hideTooltip() {
    this._tooltipVisible = false;
    this._render();
  }
}

customElements.define('uc-tooltip', Tooltip);
