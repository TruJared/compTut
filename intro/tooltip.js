class Tooltip extends HTMLElement {
  //  *  convention is to use underscore for things used ONLY inside class  *  //
  constructor() {
    super();
    this._tooltipContainer;
    this._tooltipText = 'default text';

    //  *  turns 'on' shadow DOM  *  //
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
      <style>
        div {
          position: absolute;
          background-color: black;
          color: white;
          zIndex: 10;
          padding: 5px;
        }
      </style>
      <slot></slot>
      <span>❓</span>
    `;
  }

  connectedCallback() {
    if (this.hasAttribute('text')) {
      this._tooltipText = this.getAttribute('text');
    }
    this.style.position = 'relative';
    const tooltipIcon = this.shadowRoot.querySelector('span');
    tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
    tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
    this.shadowRoot.appendChild(tooltipIcon);
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

customElements.define('jared-tooltip', Tooltip);
