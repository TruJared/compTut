class Modal extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    // #region
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
          top: 15vh;
          left: 12.5vw;
          width: 75vw;
          height: 400px;
          background: white;
          border-radius: 5px;
          box-shadow: 0 0 15px rgba(0,0,0,0.50);
          text-align: center;
          opacity: 0;
          pointer-events: none;
        }
        :host([opened]) #backdrop,
        :host([opened]) #modal {
          opacity: 1;
          pointer-events: all;
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
            <slot name="buttons">
              <button>This Modal Is Hot</button>
              <button>This Modal Is Not</button
            </slot>
          </section>
      </div>
    `;
  }
  // #endregion
}

customElements.define('jt-modal', Modal);
