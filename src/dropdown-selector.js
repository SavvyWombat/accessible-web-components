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

    this.addEventListener('blur', this.__close);
    this.addEventListener('click', this.__click);
    this.addEventListener('focus', this.__focus);
    this.addEventListener('keydown', this.__keydown);
    this.addEventListener('mouseout', this.__mouseout);
    this.addEventListener('mouseenter', this.__mouseenter);
  }

  disconnectedCallback() {
    this.__observer.disconnect();
    this.__observer = null;

    this.removeEventListener('blur', this.__close);
    this.removeEventListener('click', this.__click);
    this.removeEventListener('focus', this.__focus);
    this.removeEventListener('keydown', this.__keydown);
    this.addEventListener('mouseout', this.__mouseout);
    this.addEventListener('mouseenter', this.__mouseenter);
  }

  __click(event) {
    if (!this.__isOpen()) {
      this.__open();
      this.__combobox.focus();

      return;
    }

    if (event.path[0].classList.contains('option')) {
      this.__selectedIndex = Number.parseInt(event.path[0].dataset.index);
      this.__close();
      this.__combobox.focus();
      return;
    }

    this.__close();
  }

  __focus(event) {
    this.__combobox.focus();
  }

  __keydown(event) {
    switch (event.key) {
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

      case 'PageDown':
        if (this.__isOpen()) {
          this.__currentIndex += 10;
          if (this.__currentIndex >= this.__options.length) {
            this.__currentIndex = this.__options.length - 1;
          }
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

      case 'PageUp':
        if (this.__isOpen()) {
          this.__currentIndex -= 10;
          if (this.__currentIndex < 0) {
            this.__currentIndex = 0;
          }
          this.__update();
        }
        break;

      case 'Home':
        if (!this.__isOpen()) {
          this.__open();
        }

        this.__currentIndex = 0;
        this.__update();

        break;

      case 'End':
        if (!this.__isOpen()) {
          this.__open();
        }

        this.__currentIndex = this.__options.length - 1;
        this.__update();

        break;

      case 'Enter':
      case ' ': // space
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

      case 'Escape':
        this.__close();
        break;
    }
  }

  __mouseout(event) {
    console.log(event.path);
  }

  __mouseenter(event) {
    console.log(event.path);
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
      item.dataset.index = `${index}`;
      if (this.__selectedIndex === index) {
        item.classList.add('current');
        item.setAttribute('aria-selected', 'true');
      }

      item.textContent = option.text;
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
    height: calc(100% - 1em);
  }
  
  #listbox {
    margin: 0;
    padding: 0;
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