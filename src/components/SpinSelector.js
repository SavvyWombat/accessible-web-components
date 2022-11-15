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

    this.max = !isNaN(parseFloat(this.getAttribute('max'))) ? parseFloat(this.getAttribute('max')) : null;
    this.min = !isNaN(parseFloat(this.getAttribute('min'))) ? parseFloat(this.getAttribute('min')) : null;
    this.step = !isNaN(parseFloat(this.getAttribute('step'))) ? parseFloat(this.getAttribute('step')) : null;
    this.value = !isNaN(parseFloat(this.getAttribute('value'))) ? parseFloat(this.getAttribute('value')) : null;

    this.shadowRoot.addEventListener('keydown', this.keydown.bind(this));
    this.shadowRoot.getElementById('increment').addEventListener('click', this.increment.bind(this));
    this.shadowRoot.getElementById('decrement').addEventListener('click', this.decrement.bind(this));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'max':
        this.max = !isNaN(parseFloat(newValue)) ? parseFloat(newValue) : null;
        break;
      case 'min':
        this.min = !isNaN(parseFloat(newValue)) ? parseFloat(newValue) : null;
        break;
      case 'step':
        this.step = !isNaN(parseFloat(newValue)) ? parseFloat(newValue) : null;
        break;
      case 'value':
        this.value = !isNaN(parseFloat(newValue)) ? parseFloat(newValue) : null;
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
    const baseNumber = this.min ?? 0;
    const min = this.min ?? Number.NEGATIVE_INFINITY;
    const max = this.max ?? Number.POSITIVE_INFINITY;
    const step = this.step ?? 1;
    const precision = Math.pow(10, (step.toString().split('.')[1] || '').length);

    if (this.value === null) {
      this.value = 0;
    }

    if (this.value < min) {
      this.value = min;
      return;
    }

    this.value = ((v, s, m, b) => {
      if (v + s <= m) {
        return (v + s - ((v - b) % s)) / precision;
      }

      return v / precision;
    })(this.value * precision, step * precision, max * precision, baseNumber * precision);
  }

  decrement() {
    const baseNumber = this.min ?? 0;
    const min = this.min ?? Number.NEGATIVE_INFINITY;
    const max = this.max ?? Number.POSITIVE_INFINITY;
    const step = this.step ?? 1;
    const precision = Math.pow(10, (step.toString().split('.')[1] || '').length);

    if (this.value === null) {
      this.value = 0;
    }

    if (this.value > max) {
      this.value = max;
      return;
    }

    this.value = ((v, s, m, b) => {
      if ((v - b) % s) {
        return (v - ((v - b) % s)) / precision;
      }

      if (v - s >= m) {
        return (v - s) / precision;
      }

      return v / precision;
    })(this.value * precision, step * precision, min * precision, baseNumber * precision);
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