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
    <label id="label"></label>
    
    <div id="combobox"
         role="combobox"
         aria-controls="listbox"
         aria-expanded="false"
         aria-haspopup="listbox"
         aria-labelledby="label"
         tabindex="0"
    ></div>
    
    <div id="listbox"
         role="listbox"
         aria-labelledby="label"
         tabindex="-1"
    ></div>
</div>`;