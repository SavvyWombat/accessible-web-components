import {html, css, LitElement} from 'lit';

export class DatePicker extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
        color: var(--date-picker-text-color, #000);
      }
      
      fieldset {
        display: grid;
        grid-template-areas:
          ".     .     date  .     ."
          ".     month .     year  ."
          "main  main  main  main  main";
        grid-template-rows: repeat(3, auto);
        grid-template-columns: repeat(5, 1fr);
        grid-gap: 1em;
      }
      
      fieldset > .date {
        grid-area: date;
      }
      
      fieldset > .month {
        grid-area: month;
        display: flex;
        justify-content: space-between;
      }
      
      fieldset > .year {
        grid-area: year;
        display: flex;
        justify-content: space-between
      }
    `;
  }

  static get properties() {
    return {
      __date: {type: Date}
    };
  }

  constructor() {
    super();
    this.date = new Date();
    this.__date = this.date;
  }

  __incMonth() {
    this.__date.setMonth(this.__date.getMonth() + 1);
    this.__date = new Date(this.__date);
  }

  __decMonth() {
    this.__date.setMonth(this.__date.getMonth() - 1);
    this.__date = new Date(this.__date);
  }

  __incYear() {
    this.__date.setFullYear(this.__date.getFullYear() + 1);
    this.__date = new Date(this.__date);
  }

  __decYear() {
    this.__date.setFullYear(this.__date.getFullYear() - 1);
    this.__date = new Date(this.__date);
  }

  render() {
    return html`
        <fieldset>
            <input class="date" type="text" value="${new Intl.DateTimeFormat().format(this.__date)}">
            
            <div class="month">
                <button type="button" aria-label="Go back one month" @click=${this.__decMonth}>&lt;</button>
                <span>${new Intl.DateTimeFormat('default', {month: 'long'}).format(this.__date)}</span>
                <button type="button" aria-label="Go forward one month" @click=${this.__incMonth}>&gt;</button>
            </div>

            <div class="year">
                <button type="button" aria-label="Go back one year" @click=${this.__decYear}>&lt;</button>
                <span>${new Intl.DateTimeFormat('default', {year: 'numeric'}).format(this.__date)}</span>
                <button type="button" aria-label="Go forward one year" @click=${this.__incYear}>&gt;</button>
            </div>
        </fieldset>
    `;
  }
}
