export class DropdownSelector extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = html;

    this.selectedIndex = null;

    this.__label = this.shadowRoot.getElementById('label');
    this.__combobox = this.shadowRoot.getElementById('combobox');
    this.__listbox = this.shadowRoot.getElementById('listbox');

    const parentLabel = document.getElementById(this.getAttribute('aria-labelledby'));
    if (parentLabel) {
      this.__label.textContent = parentLabel.textContent;
    }

    this.options = [...this.querySelectorAll('option')].map((option, index) => {
      return {
        label: option.textContent,
        selected: option.hasAttribute('selected'),
        value: option.getAttribute('value') ?? option.textContent,
      }
    });

    this.options.forEach((option, index) => {
      const element = document.createElement('div');
      element.textContent = option.label;
      this.__listbox.appendChild(element);

      element.setAttribute('aria-selected', 'false');
      if (option.selected) {
        this.selectedIndex = index;
        element.setAttribute('aria-selected', 'true');
      }
    });

    if (this.selectedIndex === null) {
      this.selectedIndex = 0;
    }

    if (this.options[0]) {
      this.__combobox.textContent = this.options[this.selectedIndex].label
    }
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
</div>

<style>
    #combobox:focus {
        border: 3px solid #666699;
        border-radius: 0.25em;
    }
</style>
`;