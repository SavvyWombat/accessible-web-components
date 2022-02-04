import { html, fixture, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { DropdownSelector } from '../src/index.js';

window.customElements.define('dropdown-selector', DropdownSelector);

describe('DropDownSelector', () => {
  it('loads an empty dropdown selector', async () => {
    const dropdown = await fixture(html`
        <dropdown-selector></dropdown-selector>
    `);

    const label = dropdown.shadowRoot.querySelector('#label');
    expect(label).to.not.be.a('null');
    expect(label.textContent).to.be.a('string');
    expect(label.textContent).to.be.empty;

    const combobox = dropdown.shadowRoot.querySelector('#combobox');
    expect(combobox).to.not.be.a('null');
    expect(combobox.textContent).to.be.a('string');
    expect(combobox.textContent).to.be.empty;

    const listbox = dropdown.shadowRoot.querySelector('#listbox');
    expect(listbox).to.not.be.a('null');
    expect(listbox).to.have.property('children');
    expect(listbox.children.length).to.equal(0);
  });

  it('sets up required aria attributes', async () => {
    const dropdown = await fixture(html`
        <dropdown-selector></dropdown-selector>
    `);

    const combobox = dropdown.shadowRoot.querySelector('#combobox');
    expect(combobox).to.not.be.a('null');
    expect(combobox.getAttribute('id')).to.equal('combobox');
    expect(combobox.getAttribute('role')).to.equal('combobox');
    expect(combobox.getAttribute('aria-controls')).to.equal('listbox');
    expect(combobox.getAttribute('aria-expanded')).to.equal('false');
    expect(combobox.getAttribute('aria-haspopup')).to.equal('listbox');
    expect(combobox.getAttribute('aria-labelledby')).to.equal('label');
    expect(combobox.getAttribute('tabindex')).to.equal('0');

    const listbox = dropdown.shadowRoot.querySelector('#listbox');
    expect(listbox).to.not.be.a('null');
    expect(listbox.getAttribute('id')).to.equal('listbox');
    expect(listbox.getAttribute('role')).to.equal('listbox');
    expect(listbox.getAttribute('aria-labelledby')).to.equal('label');
    expect(listbox.getAttribute('tabindex')).to.equal('-1');
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