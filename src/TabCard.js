import {StyledComponent} from './StyledComponent.js';

export class TabCard extends StyledComponent(HTMLElement) {
  constructor() {
    super()
      .attachShadow({mode: 'open'})
      .innerHTML = html;
  }

  connectedCallback() {
    if (this.isConnected) {
      super.connectedCallback();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }
}

const html = `<div id="root">
<slot></slot>
</div>

<style>
::slotted(.hidden) {
  display: none;
}
</style>`;