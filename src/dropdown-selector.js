export class DropdownSelector extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    this.__options = [];
    this.__selectedIndex = 0;
    this.__rootNode = null;
    this.__outputNode = null;
    this.__listNode = null;

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
    console.log(event);
  }

  __focus(event) {
    console.log(event);
  }

  __keydown(event) {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        event.stopPropagation();

        if (this.__selectedIndex < this.__options.length) {
          this.__selectedIndex++;
        }
        this.__update();
        break;

      case 'ArrowUp':
        event.preventDefault();
        event.stopPropagation();

        if (this.__selectedIndex > 0) {
          this.__selectedIndex--;
        }
        this.__update();
        break;
    }
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

    this.__rootNode = this.shadowRoot.firstElementChild;
    this.__outputNode = this.shadowRoot.getElementById('selected-option-text');
    this.__listNode = this.shadowRoot.getElementById('list');

    this.__selectedIndex = this.__options.findIndex((option) => {
      return option.selected !== null && option.selected !== 'false';
    });
    if (this.__selectedIndex < 0) {
      this.__selectedIndex = 0;
    }

    this.__outputNode.textContent = this.__options[this.__selectedIndex].text;
    this.__rootNode.setAttribute('aria-activedescendant', this.__selectedIndex);
    this.__rootNode.setAttribute('aria-roledescription', `${this.__options[this.__selectedIndex].text} combobox open menu focus mode`)

    this.__options.forEach((option, index) => {
      const item = this.__listNode.appendChild(document.createElement('li'));

      item.setAttribute('id', `option-${index}`);
      item.setAttribute('value', option.value);
      item.setAttribute('tabindex', '-1');
      if (this.__selectedIndex === index) {
        item.setAttribute('selected', '');
      }

      item.textContent = option.text;
    });
  }

  __update() {
    this.__rootNode.setAttribute('aria-activedescendant', this.__selectedIndex);
    this.__rootNode.setAttribute('aria-roledescription', `${this.__options[this.__selectedIndex].text} combobox open menu focus mode`)

    this.__outputNode.textContent = this.__options[this.__selectedIndex].text;


    this.__listNode.childNodes.forEach((item, index) => {
        item.removeAttribute('selected');
        if (index === this.__selectedIndex) {
          item.setAttribute('selected', '');
        }
    });
  }
}

const template = `<div id="container" role="listbox" tabindex="0">
  <output id="selected-option-text"></output>
  <ul id="list"></ul>
</div>

<style>
  div {
    display: block;
    cursor: default;
    height: 2em;
    width: fit-content;
    position: relative;
    border: var(--outline, 1px solid #000000);
    background-color: var(--bg-color, #fefefe);
  }
 
  output {
    display: block;
    height: 1em;
    padding: 0.5em;
  }
  
  ul {
    margin: 0;
    padding: 0;
    overflow-y: visible;
    background-color: var(--bg-color, #fefefe);
  }
  
  li {
    height: 0;
    padding: 0 0.5em;
    list-style-type: none;
    overflow-y: hidden;
  }
</style>`;