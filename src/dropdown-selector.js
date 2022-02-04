export class DropdownSelector extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = html;

    this.listbox = this.shadowRoot.getElementById('listbox');

    this.options = [...this.querySelectorAll('option')].map((option, index) => {
      return {
        label: option.textContent,
        value: option.getAttribute('value') ?? option.textContent,
      }
    });

    this.options.forEach((option) => {
      const element = document.createElement('div');
      element.textContent = option.label;
      this.listbox.appendChild(element);
    });
  }
}

const html = `<div>
    <div id="combobox"></div>
    <div id="listbox"></div>
</div>`;