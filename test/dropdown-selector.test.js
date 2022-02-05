import { html, fixture, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { DropdownSelector } from '../src/index.js';

window.customElements.define('dropdown-selector', DropdownSelector);

describe('DropDownSelector', () => {
  it('loads an empty dropdown selector', async () => {
    const dropdown = await fixture(html`
        <dropdown-selector></dropdown-selector>
    `);

    const label = dropdown.shadowRoot.getElementById('label');
    expect(label).to.not.be.a('null');
    expect(label.textContent).to.be.a('string');
    expect(label.textContent).to.be.empty;

    const combobox = dropdown.shadowRoot.getElementById('combobox');
    expect(combobox).to.not.be.a('null');
    expect(combobox.textContent).to.be.a('string');
    expect(combobox.textContent).to.be.empty;

    const listbox = dropdown.shadowRoot.getElementById('listbox');
    expect(listbox).to.not.be.a('null');
    expect(listbox).to.have.property('children');
    expect(listbox.children.length).to.equal(0);
  });

  it('sets up required aria attributes', async () => {
    const dropdown = await fixture(html`
        <dropdown-selector></dropdown-selector>
    `);

    const combobox = dropdown.shadowRoot.getElementById('combobox');
    expect(combobox).to.not.be.a('null');
    expect(combobox.getAttribute('role')).to.equal('combobox');
    expect(combobox.getAttribute('aria-activedescendant')).to.equal('');
    expect(combobox.getAttribute('aria-controls')).to.equal('listbox');
    expect(combobox.getAttribute('aria-expanded')).to.equal('false');
    expect(combobox.getAttribute('aria-haspopup')).to.equal('listbox');
    expect(combobox.getAttribute('aria-labelledby')).to.equal('label');
    expect(combobox.getAttribute('tabindex')).to.equal('0');

    const listbox = dropdown.shadowRoot.getElementById('listbox');
    expect(listbox).to.not.be.a('null');
    expect(listbox.getAttribute('role')).to.equal('listbox');
    expect(listbox.getAttribute('aria-labelledby')).to.equal('label');
    expect(listbox.getAttribute('tabindex')).to.equal('-1');
  });

  // testing (or maybe the underlying lit) library won't let our component access the outer DOM
  it.skip('sets up the label', async () => {
    const form = await fixture(html`
        <form>
            <label id="some-label">Make a choice</label>
            <dropdown-selector aria-labelledby="some-label"></dropdown-selector>
        </form>
    `);

    const label = form.querySelector('dropdown-selector').shadowRoot.querySelector('label');
    expect(label).to.not.be.a('null');
    expect(label.textContent).to.equal('Make a choice');
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

    const listbox = dropdown.shadowRoot.getElementById('listbox');
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

  it('sets the combobox value if no options are selected', async () => {
    const dropdown = await fixture(html`
        <dropdown-selector>
            <option>Some Value</option>
            <option>Another Value</option>
        </dropdown-selector>
    `);

    const combobox = dropdown.shadowRoot.getElementById('combobox');
    expect(combobox).to.not.be.a('null');
    expect(combobox.textContent).to.equal('Some Value');
  });

  it('sets the combobox value to the selected option', async () => {
    const dropdown = await fixture(html`
        <dropdown-selector>
            <option>Some Value</option>
            <option selected>Another Value</option>
        </dropdown-selector>
    `);

    const combobox = dropdown.shadowRoot.getElementById('combobox');
    expect(combobox).to.not.be.a('null');
    expect(combobox.textContent).to.equal('Another Value');
  });

  it('starts with the listbox closed', async () => {
    const dropdown = await fixture(html`
        <dropdown-selector>
            <option>Some Value</option>
        </dropdown-selector>
    `);

    const combobox = dropdown.shadowRoot.getElementById('combobox');
    expect(combobox.getAttribute('aria-expanded')).to.equal('false');

    const listbox = dropdown.shadowRoot.getElementById('listbox');
    expect(listbox.clientHeight).to.equal(0);
  });

  it('opens the listbox', async () => {
    const dropdown = await fixture(html`
        <dropdown-selector>
            <option>Some Value</option>
        </dropdown-selector>
    `);

    const combobox = dropdown.shadowRoot.getElementById('combobox');
    await combobox.click();

    expect(dropdown.shadowRoot.activeElement).to.equal(combobox);
    expect(combobox.getAttribute('aria-expanded')).to.equal('true');

    const listbox = dropdown.shadowRoot.getElementById('listbox');
    expect(listbox.clientHeight).to.be.greaterThan(0);
  });

  it('sets the active descendant when opening', async() => {
    const dropdown = await fixture(html`
        <dropdown-selector>
            <option>Some Value</option>
            <option selected>Another Value</option>
        </dropdown-selector>
    `);

    const combobox = dropdown.shadowRoot.getElementById('combobox');
    await combobox.click();

    expect(combobox.getAttribute('aria-activedescendant')).to.equal('option-1');
  })

  it('closes the list', async() => {
    const dropdown = await fixture(html`
        <dropdown-selector>
            <option>Some Value</option>
        </dropdown-selector>
    `);

    const combobox = dropdown.shadowRoot.getElementById('combobox');
    await combobox.click(); // open
    await combobox.click();

    expect(combobox.getAttribute('aria-expanded')).to.equal('false');

    const listbox = dropdown.shadowRoot.getElementById('listbox');
    expect(listbox.clientHeight).to.equal(0);
  })

  it('unsets the active descendant when closing', async() => {
    const dropdown = await fixture(html`
        <dropdown-selector>
            <option>Some Value</option>
            <option selected>Another Value</option>
        </dropdown-selector>
    `);

    const combobox = dropdown.shadowRoot.getElementById('combobox');
    await combobox.click();
    await combobox.click();

    expect(combobox.getAttribute('aria-activedescendant')).to.equal('');
  })
});