import {BaseComponent} from './base-component.js';

export class DropdownSelector extends BaseComponent {
  constructor() {
    super()
      .attachShadow({mode: 'open'})
      .innerHTML = html;
  }

  connectedCallback() {
    if (this.isConnected) {
      this.root = this.shadowRoot.getElementById('root');
      this.combobox = this.shadowRoot.getElementById('combobox');
      this.listbox = this.shadowRoot.getElementById('listbox');

      this.selectedIndex = 0;
      this.value = '';

      this.currentIndex = null;
      this.ignoreBlur = false;
      this.initialValue = null;
      this.open = false;
      this.typeAhead = {
        timer: null,
        keys: '',
      }

      this.combobox.addEventListener('blur', this.blur.bind(this));
      this.combobox.addEventListener('click', this.click.bind(this));
      this.combobox.addEventListener('keydown', this.keydown.bind(this));

      this.attachLabelForAria([
        this.combobox,
        this.listbox,
      ])

      this.applyStyles();

      this.extractOptions();

      this.root.style.height = this.root.clientHeight + 'px';
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.combobox.removeEventListener('blur', this.blur.bind(this));
    this.combobox.removeEventListener('click', this.click.bind(this));
    this.combobox.addEventListener('keydown', this.keydown.bind(this));

    [...this.listbox.children].forEach((element, index) => {
      element.remove();
    });
  }

  blur(event) {
    if (this.ignoreBlur) {
      this.ignoreBlur = false;
      return;
    }

    if (this.open) {
      this.select(this.currentIndex);
      this.closeList(false);
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
      case Actions.Typing:
        event.preventDefault();
        this.openList();
        this.typing(event.key);
        return;
    }
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

    // if the user starts typing
    if (key === 'Backspace' || key === 'Clear' || (key.length === 1 && !(key === ' ' || altKey || ctrlKey || metaKey))) {
      return Actions.Typing;
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
      } else if (key === 'Enter' || key === ' ') {
        return Actions.SelectAndClose;
      }
    }
  }

  closeList(keepFocus = true) {
    this.open = false;
    this.combobox.setAttribute('aria-expanded', 'false');
    this.combobox.setAttribute('aria-activedescendant', '');

    keepFocus && this.combobox.focus();
  }

  extractOptions() {
    this.options = [...this.querySelectorAll('option')].map((option, index) => {
      if (option.hasAttribute('selected')) {
        this.selectedIndex = index;
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

      this.listbox.appendChild(element);

      return {
        label: option.textContent,
        selected: option.hasAttribute('selected'),
        value: option.getAttribute('value') ?? option.textContent,
      }
    });

    if (this.options[0]) {
      this.combobox.textContent = this.options[this.selectedIndex].label
      this.value = this.options[this.selectedIndex].value;
    }

    [...this.listbox.children].forEach((element, index) => {
      element.addEventListener('click', (event) => {
        event.stopPropagation();
        this.select(index);
        this.click(event);
      });
      element.addEventListener('mousedown', this.setIgnoreBlur.bind(this));
    });
  }

  openList() {
    if (!this.open) {
      this.open = true;
      this.combobox.setAttribute('aria-expanded', 'true');

      this.initialValue = this.value;
      this.currentIndex = this.selectedIndex;

      this.refreshList();

      this.combobox.focus();
    }
  }

  refreshList() {
    this.combobox.setAttribute('aria-activedescendant', `option-${this.currentIndex}`);

    const options = this.listbox.querySelectorAll('[role=option]');
    [...options].forEach((option) => {
      option.classList.remove('current');
    });
    options[this.currentIndex].classList.add('current');
  }

  select(index) {
    this.currentIndex = index;
    this.selectedIndex = index;

    this.value = this.options[index].value;
    this.combobox.textContent = this.options[index].label;

    const options = this.listbox.querySelectorAll('[role=option]');
    [...options].forEach((option) => {
      option.setAttribute('aria-selected', 'false');
    });
    options[index].setAttribute('aria-selected', 'true');

    if (this.value !== this.initialValue) {
      this.dispatchEvent(
        new CustomEvent('change')
      );

      this.dispatchEvent(
        new CustomEvent('input')
      );

      this.initialValue = this.value;
    }
  }

  setIgnoreBlur() {
    this.ignoreBlur = true;
  }

  typing(key) {
    if (this.typeAhead.timer) {
      window.clearTimeout(this.typeAhead.timer);
    }

    this.typeAhead.keys += key.toLowerCase();

    this.typeAhead.timer = window.setTimeout(() => {
      let index = this.options.findIndex((option, i) => {
        const match = option.label.toLowerCase();
        return (i > this.currentIndex && match.startsWith(this.typeAhead.keys));
      });

      if (index < 0) {
        index = this.options.findIndex((option) => {
          const match = option.label.toLowerCase();
          return match.startsWith(this.typeAhead.keys);
        });
      }

      if (index >= 0) {
        this.currentIndex = index;
        this.refreshList();
      }

      this.typeAhead.keys = '';
    }, 500);
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