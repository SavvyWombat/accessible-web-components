export class VerticalMenu extends HTMLElement {
  constructor() {
    super()
      .attachShadow({mode: 'open'})
      .innerHTML = html;
  }

  connectedCallback() {
    if (this.isConnected) {
      this.__root = this.shadowRoot.getElementById('root');

      this.__root.innerHTML = this.innerHTML;
    }
  }

  disconnectedCallback() {

  }
}

const html = `<div id="root">

</div>`;