export class DropdownSelector extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    // Element functionality written in here

    this.__options = [];

    this.__mapOptions();
    this.__render();
  }

  connectedCallback() {
    if (!this.isConnected) {
      return;
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        console.log(mutation);
      });
    });

    observer.observe(this, { childList: true });
  }

  __mapOptions() {
    this.__options = Array.from(this.querySelectorAll('option')).map((option) => {
      return {
        ...Array.from(option.attributes).reduce((attributes, attribute) => {
          return {
            ...attributes,
            [attribute.name]: attribute.value,
          }
        }, {}),

        text: option.textContent
      }
    });
  }

  __render() {
    // Create the shadow root
    this.attachShadow({mode: 'open'}); // sets and returns 'this.shadowRoot'

    this.shadowRoot.innerHTML = template;

    let selected = this.__options.find((option) => {
      return option.hasOwnProperty('selected') && option.selected !== 'false';
    });
    if (selected === undefined) {
      selected = this.__options[0];
    }

    this.shadowRoot.getElementById('selected-option-text').innerHTML = selected.text;

    this.__options.forEach((option, index) => {
      const item = this.shadowRoot.getElementById('list').appendChild(document.createElement('li'));
      item.setAttribute('data-index', `${index}`);
      item.textContent = option.text;
    })
  }
}

const template = `<div>
  <span id="selected-option-text"></span>
  <ul id="list" role="listbox"></ul>
</div>

<style>
ul {
    margin: 0;
    padding: 0;
}

li {
    list-style-type: none;
}
</style>`;