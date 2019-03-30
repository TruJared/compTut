import { Component, Prop, State, Method } from '@stencil/core';

@Component({
  tag: 'jt-side-drawer',
  styleUrl: './side-drawer.css',
  shadow: true,
})
export class SideDrawer {
  // state listens for changes inside the class //
  @State() showAboutInfo = false;

  // can use both @prop and slots to pass info from outside this class //
  // listen for changes outside of the class //
  //  *  set reflectToAttr to true to have attribute change  *  //
  @Prop({ reflectToAttr: true }) title: string;
  @Prop({ reflectToAttr: true, mutable: true }) open: boolean;

  // private methods //
  onCloseDrawer() {
    this.open = false;
  }

  onContentChange(content: string) {
    this.showAboutInfo = content === 'about';
  }

  // public methods //
  @Method()
  openIt() {
    this.open = true;
  }

  render() {
    const mainContent = !this.showAboutInfo ? (
      <slot />
    ) : (
      <div>
        <h2>Created By Jared</h2>
        <a href="http://jaredmakes.com" target="_blank">
          JaredMakes.com
        </a>
      </div>
    );
    return [
      <div class="backdrop" onClick={this.onCloseDrawer.bind(this)} />,
      <aside>
        <header>
          <button
            id="menu-close-button"
            onClick={this.onCloseDrawer.bind(this)}
          >
            X
          </button>
          <h1>{this.title || 'Menu'}</h1>
        </header>
        <section id="tabs">
          <button
            class={!this.showAboutInfo ? 'active' : ''}
            onClick={this.onContentChange.bind(this, 'nav')}
          >
            Nav
          </button>
          <button
            class={this.showAboutInfo ? 'active' : ''}
            onClick={this.onContentChange.bind(this, 'about')}
          >
            About
          </button>
        </section>
        <main>{mainContent}</main>
      </aside>,
    ];
  }
}
