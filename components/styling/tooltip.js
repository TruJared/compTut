class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
    this._tooltipText = 'Some dummy tooltip text.';
    this.attachShadow({ mode: 'open' });

    //  !  use ::slotted(*) to select all slotted elements  !  //
    //  !  light DOM styling overwrites shadow DOM styling  !  //
    //  !  :host -> allows for styling of own element (i.e. <uc-tooltip>)  !  //
    //  !  :host() -> allows for styling of own elements based on...
    //  !..class, id, element, etc.. (i.e host(.some-class, .another-class, a, #some-id)  !  //
    //  !  :host-context() is used to target children contextually..!..//
    this.shadowRoot.innerHTML = `
        <style>
            div {
                background-color: black;
                color: white;
                position: absolute;
                z-index: 10;
            }
            :host {
              background: #ccc;
            }
            :host(.from-host) {
              background: #bada55;
            }
            :host-context(p) {
              font-weight: bold;
            }
            ::slotted(.highlight) {
              border-bottom: 1px solid green;
            }
            .icon {
              background: darkgrey;
              color: papayawhip;
              padding: 1px 5px;
              text-align: center;
              border-radius: 15px;
              margin: 2px;
            }
        </style>
        <slot>Some default</slot>
        <span class="icon">?</span>
    `;
  }

  connectedCallback() {
    if (this.hasAttribute('text')) {
      this._tooltipText = this.getAttribute('text');
    }
    const tooltipIcon = this.shadowRoot.querySelector('span');
    tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
    tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
    this.shadowRoot.appendChild(tooltipIcon);
    this.style.position = 'relative';
  }

  _showTooltip() {
    this._tooltipContainer = document.createElement('div');
    this._tooltipContainer.textContent = this._tooltipText;
    this.shadowRoot.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }
}

customElements.define('uc-tooltip', Tooltip);
