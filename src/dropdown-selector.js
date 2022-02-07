export class DropdownSelector extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = html;

    this.ignoreBlur = false;
    this.open = false;
    this.currentIndex = null;
    this.selectedIndex = null;
    this.value = null;

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
      element.setAttribute('role', 'option');
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
      this.value = this.options[this.selectedIndex].value;
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
      this.__combobox.addEventListener('keydown', this.keydown.bind(this));

      [...this.__listbox.children].forEach((element, index) => {
        element.addEventListener('click', (event) => {
          event.stopPropagation();
          this.select(index);
          this.click(event);
        });
        element.addEventListener('mousedown', this.setIgnoreBlur.bind(this));
      });
    }
  }

  disconnectedCallback() {
    if (this.__parentLabel) {
      this.__parentLabel.removeEventListener('click', this.click.bind(this));
    }

    this.__combobox.removeEventListener('blur', this.blur.bind(this));
    this.__combobox.removeEventListener('click', this.click.bind(this));
    this.__combobox.addEventListener('keydown', this.keydown.bind(this));

    [...this.__listbox.children].forEach((element, index) => {
      element.removeEventListener('mousedown', this.setIgnoreBlur.bind(this));
    });
  }

  blur(event) {
    if (this.ignoreBlur) {
      this.ignoreBlur = false;
      return;
    }

    if (this.open) {
      this.select(this.currentIndex);
      this.closeList();
    }
  }

  click(event) {
    this.open ? this.closeList() : this.openList();
  }

  keydown(event) {
    const action = this.actionFromKey(event);

    switch (action) {
      case Actions.First:
      case Actions.Last:
        this.openList();
        // intentional fallthrough
      case Actions.Up:
      case Actions.Down:
      case Actions.PageUp:
      case Actions.PageDown:
        event.preventDefault();
        this.updateCurrentIndex(action);
        this.refreshList();
        break;
      case Actions.SelectAndClose:
        event.preventDefault();
        this.select(this.currentIndex);
        // intentional fallthrough
      case Actions.Close:
        event.preventDefault();
        this.closeList();
        return;
      case Actions.Open:
        event.preventDefault();
        this.openList();
        return;
    }
  }

  setIgnoreBlur() {
    this.ignoreBlur = true;
  }

  actionFromKey(event) {
    const {key, altKey, ctrlKey, metaKey} = event;
    const openKeys = ['ArrowDown', 'ArrowUp', 'Enter', ' ']; // all keys that will do the default open action
    // handle opening when closed
    if (!this.open && openKeys.includes(key)) {
      return Actions.Open;
    }

    // home and end move the selected option when open or closed
    if (key === 'Home') {
      return Actions.First;
    }
    if (key === 'End') {
      return Actions.Last;
    }

    if (this.open) {
      if (key === 'ArrowUp' && altKey) {
        return Actions.SelectAndClose;
      } else if (key === 'ArrowDown' && !altKey) {
        return Actions.Down;
      } else if (key === 'ArrowUp') {
        return Actions.Up;
      } else if (key === 'PageUp') {
        return Actions.PageUp;
      } else if (key === 'PageDown') {
        return Actions.PageDown;
      } else if (key === 'Escape') {
        return Actions.Close;
      } else  if (key === 'Enter' || key === ' ') {
        return Actions.SelectAndClose;
      }
    }
  }

  updateCurrentIndex(action) {
    const max = this.options.length - 1;

    switch (action) {
      case Actions.Up:
        this.currentIndex -= 1;
        break;
      case Actions.Down:
        this.currentIndex += 1;
        break;
      case Actions.PageUp:
        this.currentIndex -= 10;
        break;
      case Actions.PageDown:
        this.currentIndex += 10;
        break;
      case Actions.First:
        this.currentIndex = 0;
        break;
      case Actions.Last:
        this.currentIndex = max;
        break;
    }

    if (this.currentIndex > max) {
      this.currentIndex = max;
    }
    if (this.currentIndex < 0) {
      this.currentIndex = 0;
    }
  }

  select(index) {
    this.currentIndex = index;
    this.selectedIndex = index;

    this.value = this.options[index].value;
    this.__combobox.textContent = this.options[index].label;

    const options = this.__listbox.querySelectorAll('[role=option]');
    [...options].forEach((option) => {
      option.setAttribute('aria-selected', 'false');
    });
    options[index].setAttribute('aria-selected', 'true');
  }

  refreshList() {
    this.__combobox.setAttribute('aria-activedescendant', `option-${this.currentIndex}`);

    const options = this.__listbox.querySelectorAll('[role=option]');
    [...options].forEach((option) => {
      option.classList.remove('current');
    });
    options[this.currentIndex].classList.add('current');
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

    this.currentIndex = this.selectedIndex;

    this.refreshList();

    this.__combobox.focus();
  }
}

const Actions = {
  Open: 0,
  Close: 1,
  Up: 2,
  Down: 3,
  PageUp: 4,
  PageDown: 5,
  First: 7,
  Last: 8,
  Select: 9,
  SelectAndClose: 10,
};

const html = `<label id="label"></label>
<div id="root">
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
    
    .option.current {
        outline: 2px solid #acdcfc;
        background-color: #f0f0f0;
    }
    
    .option:hover {
        background-color: #acdcfc;
    }
</style>
`;