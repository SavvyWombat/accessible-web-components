export class DatePicker extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    // Element functionality written in here

    this.__date = new Date();

    // Create a shadow root
    this.attachShadow({mode: 'open'}); // sets and returns 'this.shadowRoot'

    // Define the fieldset wrapper
    const datePicker = document.createElement('fieldset');
    datePicker.setAttribute('class', 'date-picker');

    // Show the current date in a disabled input
    this.date = document.createElement('input');
    this.date.setAttribute('class', 'date');
    this.date.setAttribute('type', 'input');
    this.date.disabled = true;
    this.date.setAttribute('value', new Intl.DateTimeFormat().format(this.__date));
    datePicker.append(this.date);

    // Selector to control the month
    const monthSelector = document.createElement('div');
    monthSelector.setAttribute('class', 'month');
    monthSelector.append(this.__button(this.__decMonth, '<', 'Go back one month'));

    this.monthLabel = document.createElement('span');
    this.monthLabel.textContent = new Intl.DateTimeFormat('default', {month: 'long'}).format(this.__date)
    monthSelector.append(this.monthLabel);

    monthSelector.append(this.__button(this.__incMonth, '>', 'Go forward one month'));
    datePicker.append(monthSelector);

    // Selector to control the year
    const yearSelector = document.createElement('div');
    yearSelector.setAttribute('class', 'year');
    yearSelector.append(this.__button(this.__decYear, '<', 'Go back one year'));

    this.yearLabel = document.createElement('span');
    this.yearLabel.textContent = new Intl.DateTimeFormat('default', {year: 'numeric'}).format(this.__date)
    yearSelector.append(this.yearLabel);

    yearSelector.append(this.__button(this.__incYear, '>', 'Go forward one year'));
    datePicker.append(yearSelector);

    // Add component and styles to the shadow DOM
    this.shadowRoot.append(this.__styles(), datePicker);
  }

  __update(picker) {
    picker.monthLabel.textContent = new Intl.DateTimeFormat('default', {month: 'long'}).format(picker.__date)
    picker.yearLabel.textContent = new Intl.DateTimeFormat('default', {year: 'numeric'}).format(picker.__date)
    picker.date.setAttribute('value', new Intl.DateTimeFormat().format(this.__date));
  }

  __button(listener, content, label) {
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('aria-label', label);
    button.addEventListener('click', () => listener(this));
    button.textContent = content;

    return button;
  }

  __decMonth(picker) {
    picker.__date.setMonth(picker.__date.getMonth() - 1);
    picker.__date = new Date(picker.__date);
    picker.__update(picker);
  }

  __incMonth(picker) {
    picker.__date.setMonth(picker.__date.getMonth() + 1);
    picker.__date = new Date(picker.__date);
    picker.__update(picker);
  }

  __decYear(picker) {
    picker.__date.setFullYear(picker.__date.getFullYear() - 1);
    picker.__date = new Date(picker.__date);
    picker.__update(picker);
  }

  __incYear(picker) {
    picker.__date.setFullYear(picker.__date.getFullYear() + 1);
    picker.__date = new Date(picker.__date);
    picker.__update(picker);
  }

  __styles() {
    const styles = document.createElement('style');
    styles.textContent = `
.date-picker {
  border: 1px solid black;
  min-width: 10em;
  min-height: 10em;
  
  font-variant-numeric: tabular-nums;
  
  display: grid;
  grid-template-areas:
    ".     .     date  .     ."
    ".     month .     year  ."
    "main  main  main  main  main";
  grid-template-rows: repeat(3, auto);
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1em;
}

.date {
  grid-area: date;
  font-variant-numeric: tabular-nums;
}

.month {
  grid-area: month;
  display: flex;
  justify-content: space-between;
}

.year {
  grid-area: year;
  display: flex;
  justify-content: space-between;
}
`;

    return styles;
  }
}
