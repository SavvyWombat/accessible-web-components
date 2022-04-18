import {BaseComponent} from './base-component.js';

export class DropdownSelector extends BaseComponent {
  static get observedAttributes() {
    return ['disabled', 'value'];
  }

  constructor() {
    super()
      .attachShadow({mode: 'open'})
      .innerHTML = html;

    this.__options = [];
  }

  connectedCallback() {
    if (this.isConnected) {
      this.__root = this.shadowRoot.getElementById('root');
      this.__combobox = this.shadowRoot.getElementById('combobox');
      this.__listbox = this.shadowRoot.getElementById('listbox');

      this.__selectedIndex = 0;
      // we need to store whether the user has defined a tabIndex for later use
      this.__userTabIndex = this.tabIndex;
      this.__value = '';

      this.__currentIndex = null;
      this.__ignoreBlur = false;
      this.__initialValue = null;
      this.__open = false;
      this.__typeAhead = {
        timer: null,
        keys: '',
      }

      this.__combobox.addEventListener('blur', this.blur.bind(this));
      this.__combobox.addEventListener('click', this.click.bind(this));
      this.__combobox.addEventListener('keydown', this.keydown.bind(this));
      // we need to store whether the user has defined a tabIndex for later use
      this.__combobox.addEventListener('mousedown', this.mousedown.bind(this));

      this.attachLabelForAria([
        this.__combobox,
        this.__listbox,
      ])

      this.applyStyles();

      this.__extractOptions();

      this.__optionsObserver = new MutationObserver((changes) => {
        this.__extractOptions();
      });
      this.__optionsObserver.observe(this, { childList: true });

      this.__root.style.height = this.__root.clientHeight + 'px';
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'disabled') {
      if (newValue !== null) {
        // prevent focus from keyboard navigation
        this.tabIndex = '-1';
      } else {
        // restore the original tabIndex as set by the user
        // if the user didn't set a tabIndex, this will remove the tabIndex
        this.tabIndex = this.__userTabIndex;
      }
    }

    if (name === 'value') {
      this.value = newValue;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.__combobox.removeEventListener('blur', this.blur.bind(this));
    this.__combobox.removeEventListener('click', this.click.bind(this));
    this.__combobox.addEventListener('keydown', this.keydown.bind(this));
    this.__combobox.addEventListener('mousedown', this.mousedown.bind(this));

    [...this.__listbox.children].forEach((child) => child.remove());

    this.__optionsObserver.disconnect();
  }

  blur(event) {
    if (this.__ignoreBlur) {
      this.__ignoreBlur = false;
      return;
    }

    if (this.__open) {
      this.select(this.__currentIndex);
      this.closeList(false);
    }
  }

  click(event) {
    if (this.disabled) {
      return;
    }

    this.__open ? this.closeList() : this.openList();
  }

  keydown(event) {
    const action = this.__actionFromKey(event);

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
        this.__updateCurrentIndex(action);
        this.__refreshList();
        break;
      case Actions.SelectAndClose:
        event.preventDefault();
        this.select(this.__currentIndex);
      // intentional fallthrough
      case Actions.Close:
        event.preventDefault();
        this.closeList();
        return;
      case Actions.Open:
        event.preventDefault();
        this.openList();
        return;
      case Actions.Typing:
        event.preventDefault();
        this.openList();
        this.__typing(event.key);
        return;
    }
  }

  mousedown(event) {
    if (this.disabled) {
      // stops the element getting focus when clicked
      event.stopImmediatePropagation();
      event.preventDefault();
    }
  }

  __actionFromKey(event) {
    const {key, altKey, ctrlKey, metaKey} = event;
    const openKeys = ['ArrowDown', 'ArrowUp', 'Enter', ' ']; // all keys that will do the default open action
    // handle opening when closed
    if (!this.__open && openKeys.includes(key)) {
      return Actions.Open;
    }

    // home and end move the selected option when open or closed
    if (key === 'Home') {
      return Actions.First;
    }
    if (key === 'End') {
      return Actions.Last;
    }

    // if the user starts typing
    if (key === 'Backspace' || key === 'Clear' || (key.length === 1 && !(key === ' ' || altKey || ctrlKey || metaKey))) {
      return Actions.Typing;
    }

    if (this.__open) {
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
      } else if (key === 'Enter' || key === ' ') {
        return Actions.SelectAndClose;
      }
    }
  }

  closeList(keepFocus = true) {
    this.__open = false;
    this.__combobox.setAttribute('aria-expanded', 'false');
    this.__combobox.setAttribute('aria-activedescendant', '');

    keepFocus && this.__combobox.focus();
  }

  __extractOptions() {
    this.__selectedIndex = 0;
    [...this.__listbox.children].forEach((element) => {
      element.remove();
    });

    this.__options = [...this.querySelectorAll('option')].map((option, index) => {
      if (option.hasAttribute('selected')) {
        this.__selectedIndex = index;
      }

      const element = document.createElement('div');
      element.textContent = option.textContent;
      element.classList.add('option');
      element.setAttribute('id', `option-${index}`);
      element.setAttribute('role', 'option');
      element.setAttribute('aria-selected', 'false');
      if (option.hasAttribute('selected')) {
        element.setAttribute('aria-selected', 'true');
      }

      this.__listbox.appendChild(element);

      return {
        label: option.textContent,
        selected: option.hasAttribute('selected'),
        value: option.getAttribute('value') ?? option.textContent,
      }
    });

    if (this.__options[0]) {
      this.__combobox.textContent = this.__options[this.__selectedIndex].label
      this.__value = this.__options[this.__selectedIndex].value;
    }

    [...this.__listbox.children].forEach((element, index) => {
      element.addEventListener('click', (event) => {
        event.stopPropagation();
        this.select(index);
        this.click(event);
      });
      element.addEventListener('mousedown', this.__setIgnoreBlur.bind(this));
    });
  }

  openList() {
    if (!this.__open) {
      this.__open = true;
      this.__combobox.setAttribute('aria-expanded', 'true');

      this.__initialValue = this.__value;
      this.__currentIndex = this.__selectedIndex;

      this.__refreshList();

      this.__combobox.focus();
    }
  }

  __refreshList() {
    this.__combobox.setAttribute('aria-activedescendant', `option-${this.__currentIndex}`);

    const options = this.__listbox.querySelectorAll('[role=option]');
    [...options].forEach((option) => {
      option.classList.remove('current');
    });
    options[this.__currentIndex].classList.add('current');
  }

  select(index) {
    if (this.__options[index]) {
      this.__currentIndex = index;
      this.__selectedIndex = index;

      this.__value = this.__options[index].value;
      this.__combobox.textContent = this.__options[index].label;

      const options = this.__listbox.querySelectorAll('[role=option]');
      [...options].forEach((option) => {
        option.setAttribute('aria-selected', 'false');
      });
      options[index].setAttribute('aria-selected', 'true');

      if (this.__value !== this.__initialValue) {
        this.dispatchEvent(
          new Event('change')
        );

        this.dispatchEvent(
          new Event('input')
        );

        this.__initialValue = this.__value;
      }
    }
  }

  __setIgnoreBlur() {
    this.__ignoreBlur = true;
  }

  __typing(key) {
    if (this.__typeAhead.timer) {
      window.clearTimeout(this.__typeAhead.timer);
    }

    this.__typeAhead.keys += key.toLowerCase();

    this.__typeAhead.timer = window.setTimeout(() => {
      let index = this.__options.findIndex((option, i) => {
        const match = option.label.toLowerCase();
        return (i > this.__currentIndex && match.startsWith(this.__typeAhead.keys));
      });

      if (index < 0) {
        index = this.__options.findIndex((option) => {
          const match = option.label.toLowerCase();
          return match.startsWith(this.__typeAhead.keys);
        });
      }

      if (index >= 0) {
        this.__currentIndex = index;
        this.__refreshList();
      }

      this.__typeAhead.keys = '';
    }, 500);
  }

  __updateCurrentIndex(action) {
    const max = this.__options.length - 1;

    switch (action) {
      case Actions.Up:
        this.__currentIndex -= 1;
        break;
      case Actions.Down:
        this.__currentIndex += 1;
        break;
      case Actions.PageUp:
        this.__currentIndex -= 10;
        break;
      case Actions.PageDown:
        this.__currentIndex += 10;
        break;
      case Actions.First:
        this.__currentIndex = 0;
        break;
      case Actions.Last:
        this.__currentIndex = max;
        break;
    }

    if (this.__currentIndex > max) {
      this.__currentIndex = max;
    }
    if (this.__currentIndex < 0) {
      this.__currentIndex = 0;
    }
  }

  add(item, before = null) {
    if (before === null) {
      this.appendChild(item);
      return;
    }

    if (before instanceof HTMLElement) {
      this.insertBefore(item, before);
      return;
    }

    if (typeof before === 'number' && before >= 0 && before < this.length) {
      const beforeOption = this.options.item(before);
      this.insertBefore(item, beforeOption);
    }
  }

  item(index) {
    return this.querySelectorAll('option').item(index);
  }

  namedItem(name) {
    let element = this.querySelector(`option[name=${name}]`);
    if (!element) {
      element = this.querySelector(`option[id=${name}]`);
    }
    return element;
  }

  remove(index = null) {
    if (isNaN(index)) {
      this.parentNode.removeChild(this);
    }

    this.item(index)?.remove();
  }

  get autofocus() {
    return this.getAttribute('autofocus');
  }

  set autofocus(newValue) {
    if (newValue) {
      this.setAttribute('autofocus', '');
    } else {
      this.removeAttribute('autofocus');
    }
  }

  get disabled() {
    // boolean attributes have no value - they either exist or they don't
    return this.hasAttribute('disabled');
  }

  set disabled(newValue) {
    if (newValue) {
      // boolean attributes have no value - they either exist or they don't
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  get form() {
    return this.getAttribute('form');
  }

  get labels() {
    return document.querySelectorAll(`[for=${this.id}]`);
  }

  get length() {
    return this.__options.length;
  }

  get name() {
    return this.getAttribute('name');
  }

  set name(newValue) {
    if (newValue) {
      this.setAttribute('name', newValue);
    } else {
      this.removeAttribute('name');
    }
  }

  get options() {
    return this.querySelectorAll('option');
  }

  get required() {
    return this.getAttribute('required');
  }

  set required(newValue) {
    if (newValue) {
      this.setAttribute('required', '');
    } else {
      this.removeAttribute('required');
    }
  }

  get selectedIndex() {
    return this.__selectedIndex;
  }

  get selectedOptions() {
    return [...this.querySelectorAll('option')].filter((element, index) => {
      return index === this.selectedIndex;
    });
  }

  get tabIndex() {
    return this.getAttribute('tabIndex');
  }

  set tabIndex(newValue) {
    if (newValue || newValue === '0') {
      this.setAttribute('tabIndex', newValue);
    } else {
      this.removeAttribute('tabIndex');
    }
  }

  get type() {
    return 'select-one';
  }

  get value() {
    return this.__value;
  }

  set value(newValue) {
    this.select(this.__options?.findIndex((option) => option.value == newValue));
  }
}

const Actions = {
  Open: 0,
  Close: 1,
  Up: 2,
  Down: 3,
  PageUp: 4,
  PageDown: 5,
  First: 6,
  Last: 7,
  Select: 8,
  SelectAndClose: 9,
  Typing: 10,
};

const html = `<div id="root">
    <div id="combobox"
         role="combobox"
         aria-activedescendant=""
         aria-controls="listbox"
         aria-expanded="false"
         aria-haspopup="listbox"
         tabindex="0"
    ></div>
    
    <div id="listbox"
         role="listbox"
         tabindex="-1"
    ></div>
</div>

<style>
:host > *:first-child {
  display: inline-block;
}

#listbox {
  height: 0;
  overflow-y: hidden;
  position: relative;
}

#combobox[aria-expanded=true] ~ #listbox {
  height: auto;
}
</style>`;