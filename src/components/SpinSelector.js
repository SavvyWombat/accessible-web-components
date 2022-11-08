import {LabelledComponent} from "../mixins/LabelledComponent.js";

export class SpinSelector extends LabelledComponent(HTMLElement) {
  static get observedAttributes() {
    return [
      'disabled',
      'min',
      'max',
      'required',
      'step',
      'value'
    ];
  }

  constructor() {
    super()
      .attachShadow({mode: 'open'})
      .innerHTML = html;

    this.__labelledElementIds = ['root'];
  }

  connectedCallback() {
    if (this.isConnected) {
      super.connectedCallback();
    }

    this.__root = this.shadowRoot.getElementById('root');

    this.max = parseFloat(this.getAttribute('max')) || null;
    this.min = parseFloat(this.getAttribute('min')) || null;
    this.step = parseFloat(this.getAttribute('step')) || null;
    this.value = parseFloat(this.getAttribute('value')) || null;

    this.shadowRoot.addEventListener('keydown', this.keydown.bind(this));
    this.shadowRoot.getElementById('increment').addEventListener('click', this.increment.bind(this));
    this.shadowRoot.getElementById('decrement').addEventListener('click', this.decrement.bind(this));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'max':
        this.max = parseFloat(newValue);
        break;
      case 'min':
        this.min = parseFloat(newValue);
        break;
      case 'step':
        this.step = parseFloat(newValue);
        break;
      case 'value':
        this.value = parseFloat(newValue);
        break;
    }
  }

  disconnectedCallback() {
    if (this.isConnected) {
      super.disconnectedCallback();

      this.shadowRoot.removeEventListener('keydown', this.keydown.bind(this));
      this.shadowRoot.getElementById('increment').removeEventListener('click', this.increment.bind(this));
      this.shadowRoot.getElementById('decrement').removeEventListener('click', this.decrement.bind(this));
    }
  }

  click(event) {
    if (this.disabled) {
      return;
    }

    this.__root.focus();
  }

  keydown(event) {
    const action = this.__actionFromKey(event);

    switch (action) {
      case Actions.Increment:
        this.increment();
        break;
      case Actions.Decrement:
        this.decrement();
        break;
    }
  }

  increment() {
    const baseNumber = this.min === null || isNaN(this.min) ? 0 : this.min;
    const min = this.min === null || isNaN(this.min) ? Number.NEGATIVE_INFINITY : this.min;
    const max = this.max === null || isNaN(this.max) ? Number.POSITIVE_INFINITY : this.max;
    const step = this.step === null || isNaN(this.step) ? 1 : this.step;

    if (this.value === null) {
      this.value = 0;
    }

    if (this.value < min) {
      this.value = min;
      return;
    }

    if (this.value + step <= max) {
      this.value = this.value + step - ((this.value - baseNumber) % step);
    }
  }

  decrement() {
    const baseNumber = this.min === null || isNaN(this.min) ? 0 : this.min;
    const min = this.min === null || isNaN(this.min) ? Number.NEGATIVE_INFINITY : this.min;
    const max = this.max === null || isNaN(this.max) ? Number.POSITIVE_INFINITY : this.max;
    const step = this.step === null || isNaN(this.step) ? 1 : this.step;

    if (this.value === null) {
      this.value = 0;
    }

    if (this.value > max) {
      this.value = max;
      return;
    }

    if ((this.value - baseNumber) % step) {
      this.value = this.value - ((this.value - baseNumber) % step);
      return;
    }

    if (this.value - step >= min) {
      this.value = this.value - step;
    }
  }

  __actionFromKey(event) {
    const {key, altKey, ctrlKey, metaKey} = event;

    switch (key) {
      case 'ArrowUp':
      case 'ArrowRight':
      case '+':
        return Actions.Increment;

      case 'ArrowDown':
      case 'ArrowLeft':
      case '-':
        return Actions.Decrement;
    }
  }

  get max() {
    return this.__max;
  }

  set max(newMax) {
    this.__max = newMax;
  }

  get min() {
    return this.__min;
  }

  set min(newMin) {
    this.__min = newMin;
  }

  get step() {
    return this.__step;
  }

  set step(newStep) {
    this.__step = newStep;
  }

  get value() {
    return this.__value;
  }

  set value(newValue) {
    this.__value = newValue;
    this.shadowRoot.getElementById('display').textContent = newValue;
  }
}

const html = `
<div id="root" tabindex="0">
    <button id="decrement" title="Decrease">&lt;</button>
    <div id="display"></div>
    <button id="increment" title="Increase">&gt;</button>
</div>

<style>
    :host > *:first-child {
        display: inline-flex;
    }
    
    :host > *:first-child:focus {
        outline: medium auto currentColor;
        outline: medium auto invert;
        outline: 5px auto -webkit-focus-ring-color;
    }
    
    #display {
        margin-inline: 1ch;
    }
</style>
`;

const Actions = {
  Increment: 0,
  Decrement: 1,
}