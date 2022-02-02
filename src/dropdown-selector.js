export class DropdownSelector extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    this.__options = [];
    this.__selectedIndex = 0;
    this.__currentIndex = 0;
    this.__combobox = null;
    this.__listbox = null;

    this.__observer = null;

    this.__mapOptions();
    this.__render();
  }

  connectedCallback() {
    if (!this.isConnected) {
      return;
    }

    this.__observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        console.log(mutation);
      });
    });

    this.__observer.observe(this, { childList: true });

    this.addEventListener('click', this.__click);
    this.addEventListener('focus', this.__focus);
    this.addEventListener('keydown', this.__keydown);
  }

  disconnectedCallback() {
    this.__observer.disconnect();
    this.__observer = null;

    this.removeEventListener('click', this.__click);
    this.removeEventListener('click', this.__focus);
    this.removeEventListener('keydown', this.__keydown);
  }

  __click(event) {
    if (!this.__isOpen()) {
      this.__open();

      return;
    }

    this.__close();
  }

  __focus(event) {
    this.__combobox.focus();
  }

  __keydown(event) {
    console.log(event);

    switch (event.code) {
      case 'ArrowDown':
        if (!this.__isOpen()) {
          this.__open();
          break;
        }

        if (event.altKey) {
          return;
        }

        if (this.__currentIndex < this.__options.length) {
          this.__currentIndex++;
          this.__update();
        }
        break;

      case 'ArrowUp':
        if (event.altKey) {
          this.__close();
          return;
        }

        if (!this.__isOpen()) {
          this.__open();
          break;
        }

        if (this.__currentIndex > 0) {
          this.__currentIndex--;
          this.__update();
        }
        break;

      case 'Enter':
      case 'Space':
        if (!this.__isOpen()) {
          this.__open();
          break;
        }

        if (this.__isOpen()) {
          this.__selectedIndex = this.__currentIndex;
          this.__close();
          this.__combobox.focus();
        }
        break;
    }
  }

  __isOpen() {
    return this.__combobox.getAttribute('aria-expanded') === 'true';
  }

  __open() {
    this.__combobox.setAttribute('aria-expanded', 'true');
    this.__listbox.setAttribute('aria-hidden', 'false');

    this.__currentIndex = this.__selectedIndex;
    this.__combobox.setAttribute('aria-activedescendant', `option-${this.__currentIndex}`);

    this.__update();
  }

  __close() {
    this.__combobox.setAttribute('aria-expanded', 'false');
    this.__listbox.setAttribute('aria-hidden', 'true');

    this.__currentIndex = null;
    this.__combobox.setAttribute('aria-activedescendant', '');
    this.__combobox.textContent = this.__options[this.__selectedIndex].text;

    this.__update();
  }

  __mapOptions() {
    this.__options = Array.from(this.querySelectorAll('option')).map((option) => {
      return {
        selected: option.getAttribute('selected'),
        value: option.getAttribute('value'),
        text: option.textContent
      }
    });
  }

  __render() {
    this.attachShadow({mode: 'open'});

    this.shadowRoot.innerHTML = template;

    this.__combobox = this.shadowRoot.getElementById('combobox');
    this.__listbox = this.shadowRoot.getElementById('listbox');

    this.__selectedIndex = this.__options.findIndex((option) => {
      return option.selected !== null && option.selected !== 'false';
    });
    if (this.__selectedIndex < 0) {
      this.__selectedIndex = 0;
    }

    this.__combobox.textContent = this.__options[this.__selectedIndex].text;

    this.__options.forEach((option, index) => {
      const item = this.__listbox.appendChild(document.createElement('div'));

      item.classList.add('option');
      item.setAttribute('id', `option-${index}`);
      item.setAttribute('aria-selected', 'false');
      if (this.__selectedIndex === index) {
        item.classList.add('current');
        item.setAttribute('aria-selected', 'true');
      }

      item.textContent = option.text;
    });
  }

  __update() {
    this.__combobox.setAttribute('aria-activedescendant', `option-${this.__currentIndex}`);

    Array.from(this.__listbox.children).forEach((option, index) => {
      option.setAttribute('aria-selected', 'false');
      option.classList.remove('current');

      if (index === this.__currentIndex) {
        option.setAttribute('aria-selected', 'true');
        option.classList.add('current');
      }
    });
  }
}

const template = `<div class="container">
  <div id="combobox"
    aria-controls="listbox"
    aria-expanded="false"
    aria-haspopup="listbox"
    role="combobox"
    tabindex="0"
    aria-activedescendant
  ></div>
  
  <div id="listbox"
    role="listbox"
    tabindex="-1"
    aria-hidden="true"
  ></div>
</div>

<style>
  .container {
    display: block;
    cursor: default;
    height: 2em;
    width: fit-content;
    border: var(--outline, 1px solid #000000);
    background-color: var(--bg-color, #fefefe);
  }
 
  #combobox {
    display: block;
    padding: 0.5em;
  }
  
  #listbox {
    position: relative;
    z-index: 1;
  }
  
  #listbox[aria-hidden='true'] {
    height: 0;
    overflow: hidden;
  }
  
  #listbox[aria-hidden='false'] {
    border: var(--outline, 1px solid #000000);
    background-color: var(--bg-color, #fefefe);
  }
  
  .option {
    display: block;
    padding: 0.5em;
    padding-right: 1em;
  }
  
  .current {
    background-color: var(--bg-active-color, #88ccff);
  }
</style>`;