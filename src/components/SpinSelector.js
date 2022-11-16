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
    this.__input = this.shadowRoot.getElementById('input');

    this.max = !isNaN(parseFloat(this.getAttribute('max'))) ? parseFloat(this.getAttribute('max')) : null;
    this.min = !isNaN(parseFloat(this.getAttribute('min'))) ? parseFloat(this.getAttribute('min')) : null;
    this.step = !isNaN(parseFloat(this.getAttribute('step'))) ? parseFloat(this.getAttribute('step')) : null;
    this.value = !isNaN(parseFloat(this.getAttribute('value'))) ? parseFloat(this.getAttribute('value')) : null;

    this.shadowRoot.addEventListener('keydown', this.keydown.bind(this));
    this.shadowRoot.getElementById('increment').addEventListener('click', this.incrementClicked.bind(this));
    this.shadowRoot.getElementById('decrement').addEventListener('click', this.decrementClicked.bind(this));

    this.__input.addEventListener('input', this.inputChanged.bind(this));
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
      this.shadowRoot.getElementById('increment').removeEventListener('click', this.incrementClicked.bind(this));
      this.shadowRoot.getElementById('decrement').removeEventListener('click', this.decrementClicked.bind(this));

      this.__input.removeEventListener('input', this.inputChanged.bind(this));
    }
  }

  click(event) {
    if (this.disabled) {
      return;
    }

    this.__root.focus();
  }

  incrementClicked(event) {
    this.increment();
    this.__root.focus();
  }

  decrementClicked(event) {
    this.decrement();
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

  inputChanged(event) {
    if (this.__input.value.match(/[+-]?[0-9]*\.?[0-9]*/g)[0]?.length  === this.__input.value.length) {
      this.value = this.__input.value;
    } else {
      this.__input.value = this.value;
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
      case 'ArrowRight':
        if (event.target === this.__input) {
          // we want to be able to move left/right inside the text input part of the component
          return;
        }
      case 'ArrowUp':
      case '+':
        return Actions.Increment;

      case 'ArrowLeft':
        if (event.target === this.__input) {
          // we want to be able to move left/right inside the text input part of the component
          return;
        }
      case 'ArrowDown':
      case '-':
        return Actions.Decrement;

      default:
        if (event.target === this.__input) {
          return Actions.Typing
        }
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
    if (this.__input) {
      this.__input.value = newValue;
    }
  }
}

const html = `
<div id="root" tabindex="0">
    <div id="decrement" class="spin-button" title="Decrease">&lt;</div>
    <input id="input"/>
    <div id="increment" class="spin-button" title="Increase">&gt;</div>
</div>

<style>
    :host > *:first-child {
        display: inline-flex;
        border: 1px solid currentColor;
        border-radius: 3px;
    }
    
    :host > *:first-child:focus,
    :host > *:first-child:focus-within {
        outline: medium auto currentColor;
        outline: medium auto invert;
        outline: 5px auto -webkit-focus-ring-color;
    }
    
    .spin-button {
        padding-inline: 0.5ch;
        cursor: default;
    }
    
    .spin-button:hover {
        background-color: lightgray;
    }
    
    #decrement {
        margin-inline: 0 0.5ch;
        border-right: 1px solid currentColor;
        border-radius: 2px 0 0 2px;
    }
    
    #increment {
        margin-inline: 0.5ch 0;
        border-left: 1px solid currentColor;
        border-radius: 0 2px 2px 0;
    }
    
    #input {
        border: none;
        outline: none;
        text-align: right;
    }
</style>
`;

const Actions = {
  Increment: 0,
  Decrement: 1,
  Typing: 2,
}