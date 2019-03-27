class SpoilerButton extends HTMLElement {
  constructor() {
    super();

    this.buttonName = 'Spoiler Alert';
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
    <style>
      #spoiler-text {
        display: none;
      }
    </style>
    <div>
      <button>
        Spoiler Alert
      </button>
      <p id="spoiler-text">
        <slot></slot>
      </p>
    </div>
    `;

    this._spoilerText = this.shadowRoot.querySelector('#spoiler-text');

    this.shadowRoot
      .querySelector('button')
      .addEventListener('click', this._toggleSpoilerText.bind(this));
  }

  // toggle function //
  _toggleSpoilerText() {
    this._spoilerText.style.display = this._spoilerText.style.display === 'block' ? 'none' : 'block';
  }

  //  ?  is default set to show  ?  //
  connectedCallback() {
    if (this.hasAttribute('show-text-at-start')) {
      this._spoilerText.style.display = 'block';
    }
  }
}

customElements.define('jared-spoiler-button', SpoilerButton);
