class Modal extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    // #region
    //  !  could not find how to use global button styles in shadow DOM ☹️  !  //
    this.shadowRoot.innerHTML = `
      <style>
        #backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(to bottom right, transparent, black);
          z-index: 10;
          opacity: 0;
          pointer-events: none;
        }
        #modal {
          z-index: 20;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: fixed;
          top: 0;
          left: 12.5vw;
          width: 75vw;
          height: 400px;
          background: white;
          border-radius: 5px;
          box-shadow: 0 0 15px rgba(0,0,0,0.50);
          text-align: center;
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s ease-in-out;
        }
        :host(.jt-modal-dark) #modal{
          background: #292929;
          color: white;
        }
        :host([opened]) #backdrop,
        :host([opened]) #modal {
          opacity: 1;
          pointer-events: all;
        }
        :host([opened]) #modal {
          top: 10vh;
        }

        header {
          color: #abcdbd;
          font-weight: 300;
        }
        #main {
          flex: 1;
          padding: 10px 50px;
          text-align: left;
        }
        #actions {
          height: 100px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          border-top: 2px solid rgba(0,0,0,0.3);
          width: 85%;
          margin: auto;
        }
        button {
          padding: 1.25rem 1.75rem;
          text-transform: uppercase;
          background: var(--button-base);
          color: white;
          border: none;
          box-shadow: none;
          font-size: 1.8rem;
          letter-spacing: 1px;
          border-radius: 5px;
          width: 125px;
          transition: background 0.5s ease-in-out;
          margin: 10px;
      }
      button:hover {
        background: var(--button-hover);
      }
      button:active {
        background: var(--button-hover);
        transform: scale(0.98);
      }
      </style>
      <div id="backdrop"></div>
      <div id="modal">
        <header>
          <h1>
            🥓 <slot name="header-title">Check Out This Modal</slot> 🥓
          </h1>
        </header>
          <section id="main">
            <slot></slot>
          </section>
          <section id="actions">
              <button id="confirm-btn">Confirm</button>
              <button id="cancel-btn">Cancel</button>
          </section>
      </div>
    `;
    // #endregion

    // confirm and cancel actions
    this.shadowRoot.querySelector('#backdrop').addEventListener('click', this._cancel.bind(this));

    this.shadowRoot
      .querySelector('#confirm-btn')
      .addEventListener('click', this._confirm.bind(this));
    this.shadowRoot.querySelector('#cancel-btn').addEventListener('click', this._cancel.bind(this));

    //  *  FYI --- slots can be queried  *  //
    const slots = this.shadowRoot.querySelectorAll('slot');
    console.log(slots);
  }

  //  private methods  //
  //  !  these methods emit custom events  !  //
  _cancel() {
    this.hide();
    const cancelEvent = new Event('cancel');
    this.dispatchEvent(cancelEvent);
  }

  _confirm() {
    this.hide();
    const confirmEvent = new Event('confirm');
    this.dispatchEvent(confirmEvent);
  }

  //  public methods  //
  open() {
    this.setAttribute('opened', '');
  }

  hide() {
    this.removeAttribute('opened');
  }
}

customElements.define('jt-modal', Modal);
