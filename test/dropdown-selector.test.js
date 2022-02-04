import { html, fixture, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { DropdownSelector } from '../src/index.js';

window.customElements.define('dropdown-selector', DropdownSelector);

describe('DropDownSelector', () => {
  it('loads an empty dropdown selector', async () => {
    const dropdown = await fixture(html`
        <dropdown-selector></dropdown-selector>
    `);

    const combobox = dropdown.shadowRoot.querySelector('#combobox');
    expect(combobox).to.not.be.a('null');
    expect(combobox.textContent).to.be.a('string');
    expect(combobox.textContent).to.be.empty;

    const listbox = dropdown.shadowRoot.querySelector('#listbox');
    expect(listbox).to.not.be.a('null');
    expect(listbox).to.have.property('children');
    expect(listbox.children.length).to.equal(0);
  });
});