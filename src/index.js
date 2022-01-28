export class DatePicker extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    // Element functionality written in here

    this.date = new Date();
    this.buttons = {
      decMonth: this.__button(this.__decMonth, '<', 'Go back one month'),
      incMonth: this.__button(this.__incMonth, '>', 'Go forward one month'),
      decYear: this.__button(this.__decYear, '<', 'Go back one year'),
      incYear: this.__button(this.__incYear, '>', 'Go forward one year'),
    };

    this.monthNames = [];
    for (let m = 0; m < 12; m++) {
      const thisMonth = new Date(this.date);
      thisMonth.setMonth(m);
      this.monthNames.push(new Intl.DateTimeFormat('default', {month: 'long'}).format(thisMonth));
    }

    this.addEventListener('click', this.__click);
    this.addEventListener('keydown', this.__keydown);

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
    const monthControl = document.createElement('div');
    monthControl.setAttribute('class', 'month');

    this.monthSelector = document.createElement('ul');
    this.monthSelector.setAttribute('class', 'select');
    this.monthSelector.setAttribute('tabIndex', '0');
    this.monthSelector.setAttribute('aria-role', 'listbox');
    this.monthSelector.setAttribute('aria-roledescription', 'Select a month');

    this.monthNames.forEach((name, index) => {
        const monthOption = document.createElement('li');
        monthOption.setAttribute('aria-role', 'option');
        monthOption.setAttribute('data-value', `${index}`);
        monthOption.textContent = name;

        this.monthSelector.append(monthOption);
    });

    monthControl.append(
      this.buttons.decMonth,
      this.monthSelector,
      this.buttons.incMonth
    );

    datePicker.append(monthControl);

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
    this.monthSelector.setAttribute('aria-activedescendent', this.date.getMonth());
    this.monthSelector.childNodes.forEach((option) => {
      option.setAttribute('aria-selected', 'false');
    });
    this.monthSelector.childNodes[this.date.getMonth()].setAttribute('aria-selected', 'true');

    this.yearDisplay.textContent = new Intl.DateTimeFormat('default', {year: 'numeric'}).format(this.date)
    this.dateDisplay.textContent = new Intl.DateTimeFormat().format(this.date);
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

    switch (event.path[1]) {
      case this.monthSelector:
        if (this.monthSelector === this.shadowRoot.activeElement) {
          this.__setMonth(event.path[0].getAttribute('data-value'));
          this.monthSelector.blur();
        }
        break;
    }
  }

  __keydown(event) {
    switch (event.path[0]) {
      case this.monthSelector:
        this.monthSelector.childNodes[this.monthSelector.getAttribute('aria-activedescendent')].removeAttribute('data-active');

        if (event.code === 'ArrowUp' && this.monthSelector.getAttribute('aria-activedescendent') > 0) {
          this.monthSelector.setAttribute('aria-activedescendent',
            `${this.monthSelector.getAttribute('aria-activedescendent') - 1}`);
        }

        if (event.code === 'ArrowDown' && this.monthSelector.getAttribute('aria-activedescendent') < 11) {
          this.monthSelector.setAttribute('aria-activedescendent',
            `${this.monthSelector.getAttribute('aria-activedescendent') - 0 + 1}`);
        }

        if (event.code === 'Space') {
          this.__setMonth(this.monthSelector.getAttribute('aria-activedescendent'));
          break;
        }

        if (event.code === 'Escape') {
          this.monthSelector.setAttribute('aria-activedescendent', `${this.date.getMonth()}`);
          this.monthSelector.blur();
          break;
        }

        this.monthSelector.childNodes[this.monthSelector.getAttribute('aria-activedescendent')].setAttribute('data-active', '');

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
    this.date.setMonth(this.date.getMonth() - 1);
    this.__update();
  }

  __incMonth() {
    this.date.setMonth(this.date.getMonth() + 1);
    this.__update();
  }

  __setMonth(m) {
    this.date.setMonth(m);
    this.__update();
  }

  __decYear() {
    this.date.setFullYear(this.date.getFullYear() - 1);
    this.__update();
  }

  __incYear() {
    this.date.setFullYear(this.date.getFullYear() + 1);
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
  padding: 0.5rem 0;
  font-variant-numeric: tabular-nums;
}

.month {
  grid-area: month;
  display: flex;
  justify-content: space-between;
  height: 2em;
  overflow-y: visible;
}

.year {
  grid-area: year;
  display: flex;
  justify-content: space-between;
}

.select {
  flex-grow: 1;
  margin: 0;
  padding: 0;
  cursor: default;
  z-index: 1;
}

.select:hover,
.select:focus {
  outline: solid currentcolor;
  height: 26rem;
}

.select li {
  display: none;
  padding: 0.5rem 0;
}

.select li[aria-selected='true'] {
  display: block;
}

.select:hover li,
.select:focus li {
  display: block;
  background-color: var(--bg-color, #fafafa);
}

.select:hover li:hover,
.select:focus li:hover,
.select:hover li[data-active],
.select:focus li[data-active] {
  background-color: var(--bg-focus, #cccccc);
}

.select:hover li[aria-selected='true'],
.select:focus li[aria-selected='true'] {
  background-color: var(--bg-active, #ccccff);
}
`;

    return styles;
  }
}
