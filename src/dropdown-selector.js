export class DropdownSelector extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = html;
  }
}

const html = `<div>
    <div id="combobox"></div>
    <div id="listbox"></div>
</div>`;