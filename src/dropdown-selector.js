export class DropdownSelector extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = html;

    this.ignoreBlur = false;
    this.open = false;
    this.activeIndex = null;
    this.selectedIndex = null;

    this.__parentLabel = document.getElementById(this.getAttribute('aria-labelledby'));
    this.__label = this.shadowRoot.getElementById('label');
    this.__combobox = this.shadowRoot.getElementById('combobox');
    this.__listbox = this.shadowRoot.getElementById('listbox');

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

      element.classList.add('option');
      element.setAttribute('id', `option-${index}`);
      element.setAttribute('aria-selected', 'false');
      if (option.selected) {
        this.selectedIndex = index;
        element.setAttribute('aria-selected', 'true');
      }

      this.__listbox.appendChild(element);
    });

    if (this.selectedIndex === null) {
      this.selectedIndex = 0;
    }

    if (this.options[0]) {
      this.__combobox.textContent = this.options[this.selectedIndex].label
    }
  }

  connectedCallback() {
    if (this.isConnected) {
      if (this.__parentLabel) {
        this.__label.textContent = this.__parentLabel.textContent;

        this.__parentLabel.addEventListener('click', this.click.bind(this));
      }

      this.__combobox.addEventListener('blur', this.blur.bind(this));
      this.__combobox.addEventListener('click', this.click.bind(this));
    }
  }

  disconnectedCallback() {
    if (this.__parentLabel) {
      this.__parentLabel.removeEventListener('click', this.click.bind(this));
    }

    this.__combobox.removeEventListener('blur', this.blur.bind(this));
    this.__combobox.removeEventListener('click', this.click.bind(this));
  }

  click(event) {
    this.open ? this.closeList() : this.openList();
  }

  closeList() {
    this.open = false;
    this.__combobox.setAttribute('aria-expanded', 'false');
    this.__combobox.setAttribute('aria-activedescendant', '');

    this.__combobox.focus();
  }

  openList() {
    this.open = true;
    this.__combobox.setAttribute('aria-expanded', 'true');

    if (this.activeIndex === null) {
      this.activeIndex = this.selectedIndex;
    }
    this.__combobox.setAttribute('aria-activedescendant', `option-${this.activeIndex}`);

    this.__listbox.children[this.activeIndex].classList.add('current');

    this.__combobox.focus();
  }
}

const html = `<div id="root">
    <label id="label"></label>
    
    <div id="combobox"
         role="combobox"
         aria-activedescendant=""
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
    * {
        box-sizing: border-box;
    }
    
    #root {
        height: 3em;
        width: fit-content;
    }
    
    #label {
        position: absolute;
        left: -1000px;
    }
    
    #combobox {
        outline: 3px solid #999999;
        border-radius: 0.25em;
        padding: 1em;
    }
    
    #combobox:focus {
        outline: 3px solid #9cccec;
    }
    
    #listbox {
        height: 0;
        overflow-y: hidden;
        position: relative;
        background-color: #fafafa;
    }
    
    #combobox[aria-expanded=true] ~ #listbox {
        height: auto;
        outline: 3px solid #999999;
        border-radius: 0.25em;
    }
    
    .option {
        padding: 1em;
    }
    
    .option.current,
    .option:hover {
        background-color: #acdcfc;
    }
</style>
`;