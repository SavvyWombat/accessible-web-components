import {LabelledComponent} from "../mixins/LabelledComponent.js";

export class SpinButton extends LabelledComponent(HTMLElement) {
  static get observedAttributes() {
    return [
      'disabled',
      'readonly',
      'required',
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

    document.getElementById(this.form)?.addEventListener('formdata', this.formdata.bind(this));

    this.__root = this.shadowRoot.getElementById('root');
    this.__input = this.shadowRoot.getElementById('input');

    // we need to store whether the user has defined a tabIndex for later use
    this.__userTabIndex = this.tabIndex;

    if (this.hasAttribute('readonly')) {
      this.__input.setAttribute('readonly', '');
    }

    this.max = !isNaN(parseFloat(this.getAttribute('max'))) ? parseFloat(this.getAttribute('max')) : null;
    this.min = !isNaN(parseFloat(this.getAttribute('min'))) ? parseFloat(this.getAttribute('min')) : null;
    this.step = !isNaN(parseFloat(this.getAttribute('step'))) ? parseFloat(this.getAttribute('step')) : null;
    this.value = !isNaN(parseFloat(this.getAttribute('value'))) ? parseFloat(this.getAttribute('value')) : null;

    this.shadowRoot.addEventListener('click', this.click.bind(this));
    this.shadowRoot.addEventListener('keydown', this.keydown.bind(this));
    this.shadowRoot.addEventListener('mousedown', this.mousedown.bind(this));
    this.shadowRoot.getElementById('increment').addEventListener('click', this.incrementClicked.bind(this));
    this.shadowRoot.getElementById('decrement').addEventListener('click', this.decrementClicked.bind(this));

    this.__input.addEventListener('input', this.inputChanged.bind(this));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'disabled':
        if (newValue !== null) {
          // prevent focus from keyboard navigation
          this.tabIndex = '-1';
        } else {
          // restore the original tabIndex as set by the user
          // if the user didn't set a tabIndex, this will remove the tabIndex
          this.tabIndex = this.__userTabIndex;
        }
        break;
    }
  }

  disconnectedCallback() {
    if (this.isConnected) {
      super.disconnectedCallback();

      document.getElementById(this.form)?.removeEventListener('formdata', this.formdata.bind(this));

      this.shadowRoot.removeEventListener('click', this.click.bind(this));
      this.shadowRoot.removeEventListener('keydown', this.keydown.bind(this));
      this.shadowRoot.removeEventListener('mousedown', this.mousedown.bind(this));
      this.shadowRoot.getElementById('increment').removeEventListener('click', this.incrementClicked.bind(this));
      this.shadowRoot.getElementById('decrement').removeEventListener('click', this.decrementClicked.bind(this));

      this.__input.removeEventListener('input', this.inputChanged.bind(this));
    }
  }

  click(event) {
    if (this.disabled) {
      event.preventDefault();
      return;
    }

    this.__input.focus();
  }

  incrementClicked(event) {
    if (this.disabled || this.readonly) {
      event.preventDefault();
      return;
    }

    this.increment();
    this.__root.focus();
  }

  decrementClicked(event) {
    if (this.disabled || this.readonly) {
      event.preventDefault();
      return;
    }

    this.decrement();
    this.__root.focus();
  }

  formdata(event) {
    if (this.disabled) {
      return;
    }

    event.formData.append(this.name, this.value);
  }

  keydown(event) {
    const action = this.__actionFromKey(event);

    if (action !== undefined) {
      event.preventDefault();
    }

    switch (action) {
      case Actions.Increment:
        this.increment();
        break;
      case Actions.IncrementJump:
        this.increment(10);
        break;
      case Actions.Decrement:
        this.decrement();
        break;
      case Actions.DecrementJump:
        this.decrement(10);
        break;
      case Actions.Maximum:
        if (this.max !== null) {
          this.value = this.max;
        }
        break;
      case Actions.Minimum:
        if (this.min !== null) {
          this.value = this.min;
        }
    }
  }

  mousedown(event) {
    if (this.disabled) {
      // stops the element getting focus when clicked
      event.stopImmediatePropagation();
      event.preventDefault();
    }
  }

  inputChanged(event) {
    if (this.__input.value.match(/[+-]?[0-9]*\.?[0-9]*/g)[0]?.length === this.__input.value.length) {
      this.value = this.__input.value;
    } else {
      this.__input.value = this.value;
    }
  }

  increment(times = 1) {
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
      if ((v + (s * times) - ((v - b) % s)) <= m) {
        return (v + (s * times) - ((v - b) % s)) / precision;
      }

      return v / precision;
    })(this.value * precision, step * precision, max * precision, baseNumber * precision);
  }

  decrement(times = 1) {
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

      if (v - (s * times) >= m) {
        return (v - (s * times)) / precision;
      }

      return v / precision;
    })(this.value * precision, step * precision, min * precision, baseNumber * precision);
  }

  __actionFromKey(event) {
    const {key, altKey, ctrlKey, metaKey} = event;

    switch (key) {
      case 'ArrowUp':
        return Actions.Increment;

      case 'ArrowDown':
        return Actions.Decrement;

      case 'PageUp':
        return Actions.IncrementJump;

      case 'PageDown':
        return Actions.DecrementJump;

      case 'Home':
        return Actions.Minimum;

      case 'End':
        return Actions.Maximum;
    }
  }

  get autofocus() {
    // boolean attributes have no value - they either exist or they don't
    return this.hasAttribute('autofocus');
  }

  set autofocus(newValue) {
    if (newValue) {
      // boolean attributes have no value - they either exist or they don't
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
      this.__input.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
      this.__input.removeAttribute('disabled');
    }
  }

  get form() {
    return this.getAttribute('form') || this.closest('form')?.id;
  }

  set form(newValue) {
    document.getElementById(this.form)?.removeEventListener('formdata', this.formdata.bind(this));

    if (newValue) {
      this.setAttribute('form', newValue);
    } else {
      this.removeAttribute('form');
    }

    document.getElementById(this.form)?.addEventListener('formdata', this.formdata.bind(this));
  }

  get labels() {
    return document.querySelectorAll(`[for=${this.id}]`);
  }

  get max() {
    return !isNaN(parseFloat(this.getAttribute('max'))) ? parseFloat(this.getAttribute('max')) : null;
  }

  set max(newMax) {
    this.setAttribute('max', newMax);
    this.__input.ariaValueMax = newMax;
  }

  get min() {
    return !isNaN(parseFloat(this.getAttribute('min'))) ? parseFloat(this.getAttribute('min')) : null;
  }

  set min(newMin) {
    this.setAttribute('min', newMin);
    this.__input.ariaValueMin = newMin;
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

  get required() {
    // boolean attributes have no value - they either exist or they don't
    return this.hasAttribute('required');
  }

  set required(newValue) {
    if (newValue) {
      // boolean attributes have no value - they either exist or they don't
      this.setAttribute('required', '');
    } else {
      this.removeAttribute('required');
    }
  }

  get readonly() {
    // boolean attributes have no value - they either exist or they don't
    return this.hasAttribute('readonly');
  }

  set readonly(newValue) {
    if (newValue) {
      // boolean attributes have no value - they either exist or they don't
      this.setAttribute('readonly', '');
      this.__input.setAttribute('readonly', '');
    } else {
      this.removeAttribute('readonly');
      this.__input.removeAttribute('readonly');
    }
  }

  get step() {
    return !isNaN(parseFloat(this.getAttribute('step'))) ? parseFloat(this.getAttribute('step')) : null;
  }

  set step(newStep) {
    this.setAttribute('step', newStep);
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

  get value() {
    return this.__value;
  }

  set value(newValue) {
    this.__input.ariaInvalid = false;
    this.__input.ariaErrorMessage = '';
    this.__value = !isNaN(parseFloat(newValue)) ? parseFloat(newValue) : null;
    if (this.__input) {
      this.__input.value = newValue;
    }
    if (this.__value === null) {
      delete this.__input.ariaValueNow;
    } else {
      this.__input.ariaValueNow = newValue;
    }

    if (this.value > this.max) {
      this.__input.ariaErrorMessage = 'error-maximum';
      this.__input.ariaInvalid = true;
    }

    if (this.value < this.min) {
      this.__input.ariaErrorMessage = 'error-minimum';
      this.__input.ariaInvalid = true;
    }
  }
}

const html = `
<div id="root">
    <div id="decrement" class="spin-button" title="Decrease">&lt;</div>
    <input id="input" role="spinbutton"/>
    <div id="increment" class="spin-button" title="Increase">&gt;</div>
    <span id="error-minimum" class="error" aria-live="assertive">The value is below the minimum.</span>
    <span id="error-maximum" class="error" aria-live="assertive">The value is below the maximum.</span>
</div>

<style>
    :host > *:first-child {
        display: inline-flex;
        border: 1px solid currentColor;
        border-radius: 3px;
        gap: 0.5ch;
    }
    
    :host[disabled] > *:first-child {
        opacity: 0.5;
        border: 1px solid red;
    }
    
    :host > *:first-child:focus,
    :host > *:first-child:focus-within {
        outline: medium auto currentColor;
        outline: medium auto invert;
        outline: 5px auto -webkit-focus-ring-color;
    }
    
    .error {
        left: -1000px;
        position: absolute;
    }
    
    .spin-button {
        padding-inline: 0.5ch;
        cursor: default;
    }
    
    .spin-button:hover {
        background-color: lightgray;
    }
    
    #decrement {
        border-right: 1px solid currentColor;
        border-radius: 2px 0 0 2px;
    }
    
    #increment {
        border-left: 1px solid currentColor;
        border-radius: 0 2px 2px 0;
    }
    
    #input {
        border: none;
        outline: none;
        text-align: right;
        flex-shrink: 1;
        width: 100%;
    }
</style>
`;

const Actions = {
  Increment: 0,
  Decrement: 1,
  IncrementJump: 2,
  DecrementJump: 3,
  Minimum: 4,
  Maximum: 5,
}