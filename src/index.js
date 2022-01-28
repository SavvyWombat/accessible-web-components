export class DatePicker extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    // Element functionality written in here

    this.__date = new Date();
    this.buttons = {
      decMonth: this.__button(this.__decMonth, '<', 'Go back one month'),
      incMonth: this.__button(this.__incMonth, '>', 'Go forward one month'),
      decYear: this.__button(this.__decYear, '<', 'Go back one year'),
      incYear: this.__button(this.__incYear, '>', 'Go forward one year'),
    };

    this.addEventListener('click', this.__click);

    // Create a shadow root
    this.attachShadow({mode: 'open'}); // sets and returns 'this.shadowRoot'

    // Define the fieldset wrapper
    const datePicker = document.createElement('fieldset');
    datePicker.setAttribute('class', 'date-picker');

    // Show the current date as a calculated output
    this.dateDisplay = document.createElement('output');
    this.dateDisplay.setAttribute('class', 'date');
    datePicker.append(this.dateDisplay);

    // Selector to control the month
    const monthSelector = document.createElement('div');
    monthSelector.setAttribute('class', 'month');

    this.monthDisplay = document.createElement('span');

    monthSelector.append(
      this.buttons.decMonth,
      this.monthDisplay,
      this.buttons.incMonth
    );

    datePicker.append(monthSelector);

    // Selector to control the year
    const yearSelector = document.createElement('div');
    yearSelector.setAttribute('class', 'year');

    this.yearDisplay = document.createElement('span');

    yearSelector.append(
      this.buttons.decYear,
      this.yearDisplay,
      this.buttons.incYear
    );

    datePicker.append(yearSelector);

    // Add component and styles to the shadow DOM
    this.shadowRoot.append(this.__styles(), datePicker);

    this.__update();
  }

  __update() {
    this.monthDisplay.textContent = new Intl.DateTimeFormat('default', {month: 'long'}).format(this.__date)
    this.yearDisplay.textContent = new Intl.DateTimeFormat('default', {year: 'numeric'}).format(this.__date)
    this.dateDisplay.textContent = new Intl.DateTimeFormat().format(this.__date);
  }

  __click(event) {
    switch (event.path[0]) {
      case this.buttons.decMonth:
        this.__decMonth();
        break;

      case this.buttons.incMonth:
        this.__incMonth();
        break;

      case this.buttons.decYear:
        this.__decYear();
        break;

      case this.buttons.incYear:
        this.__incYear();
        break;
    }
  }

  __button(listener, content, label) {
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('aria-label', label);
    button.textContent = content;

    return button;
  }

  __decMonth() {
    this.__date.setMonth(this.__date.getMonth() - 1);
    this.__date = new Date(this.__date);
    this.__update();
  }

  __incMonth() {
    this.__date.setMonth(this.__date.getMonth() + 1);
    this.__date = new Date(this.__date);
    this.__update();
  }

  __decYear() {
    this.__date.setFullYear(this.__date.getFullYear() - 1);
    this.__date = new Date(this.__date);
    this.__update();
  }

  __incYear() {
    this.__date.setFullYear(this.__date.getFullYear() + 1);
    this.__date = new Date(this.__date);
    this.__update();
  }

  __styles() {
    const styles = document.createElement('style');
    styles.textContent = `  
.date-picker {
  border: 1px solid black;
  min-width: 10em;
  min-height: 10em;
  
  font-variant-numeric: tabular-nums;
  text-align: center;
  
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
