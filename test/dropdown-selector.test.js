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

  it('loads a dropdown with options', async () => {
    const dropdown = await fixture(html`
        <dropdown-selector>
            <option value="some-value">Some Value</option>
        </dropdown-selector>
    `);

    expect(dropdown.options).to.be.an('array');
    expect(dropdown.options.length).to.equal(1);
    expect(dropdown.options[0].label).to.equal('Some Value');
    expect(dropdown.options[0].value).to.equal('some-value');

    const listbox = dropdown.shadowRoot.querySelector('#listbox');
    expect(listbox).to.not.be.a('null');
    expect(listbox).to.have.property('children');
    expect(listbox.children.length).to.equal(1);

    expect(listbox.children[0].textContent).to.equal('Some Value');
  });

  it('options do not require a value attribute', async () => {
    const dropdown = await fixture(html`
        <dropdown-selector>
            <option>Some Value</option>
        </dropdown-selector>
    `);

    expect(dropdown.options).to.be.an('array');
    expect(dropdown.options.length).to.equal(1);
    expect(dropdown.options[0].label).to.equal('Some Value');
    expect(dropdown.options[0].value).to.equal('Some Value');
  });
});