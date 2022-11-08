import { html, fixture, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { DropdownSelector } from '../../src/index.js';

window.customElements.define('dropdown-selector', DropdownSelector);

describe('DropDownSelector', () => {
  it('loads an empty dropdown selector', async () => {
    const dropdown = await fixture(html`
        <dropdown-selector></dropdown-selector>
    `);

    const label = dropdown.shadowRoot.getElementById('label');
    expect(label).to.be.a('null');

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
        <dropdown-selector id="dropdown"></dropdown-selector>
    `);

    const combobox = dropdown.shadowRoot.getElementById('combobox');
    expect(combobox).to.not.be.a('null');
    expect(combobox.getAttribute('role')).to.equal('combobox');
    expect(combobox.getAttribute('aria-activedescendant')).to.equal('');
    expect(combobox.getAttribute('aria-controls')).to.equal('listbox');
    expect(combobox.getAttribute('aria-expanded')).to.equal('false');
    expect(combobox.getAttribute('aria-haspopup')).to.equal('listbox');
    expect(combobox.getAttribute('aria-labelledby')).to.be.a('null');
    expect(combobox.getAttribute('tabindex')).to.equal('0');

    const listbox = dropdown.shadowRoot.getElementById('listbox');
    expect(listbox).to.not.be.a('null');
    expect(listbox.getAttribute('role')).to.equal('listbox');
    expect(listbox.getAttribute('aria-labelledby')).to.be.a('null');
    expect(listbox.getAttribute('tabindex')).to.equal('-1');
  });

  it('sets up the label', async () => {
    await fixture(html`
        <form>
            <label id="some-label">Make a choice</label>
            <dropdown-selector id="dropdown" aria-labelledby="some-label"></dropdown-selector>
        </form>
    `);

    const dropdown = document.getElementById('dropdown');

    const label = dropdown.shadowRoot.querySelector('label');
    expect(label).to.not.be.a('null');
    expect(label.textContent).to.equal('Make a choice');

    const combobox = dropdown.shadowRoot.getElementById('combobox');
    expect(combobox.getAttribute('aria-labelledby')).to.equal('label');

    const listbox = dropdown.shadowRoot.getElementById('listbox');
    expect(listbox.getAttribute('aria-labelledby')).to.equal('label');
  });

  it('loads a dropdown with options', async () => {
    const dropdown = await fixture(html`
        <dropdown-selector>
            <option value="some-value">Some Value</option>
        </dropdown-selector>
    `);

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

  it('opens the listbox when clicked', async () => {
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

  it('leaves the listbox closed when tabbed into', async () => {
    const dropdown = await fixture(html`
        <dropdown-selector>
            <option>Some Value</option>
        </dropdown-selector>
    `);

    const combobox = dropdown.shadowRoot.getElementById('combobox');
    await sendKeys({
      press: 'Tab',
    });

    expect(dropdown.shadowRoot.activeElement).to.equal(combobox);
    expect(combobox.getAttribute('aria-expanded')).to.equal('false');

    const listbox = dropdown.shadowRoot.getElementById('listbox');
    expect(listbox.clientHeight).to.equal(0);
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
  });

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
  });

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
  });

  ['ArrowDown', 'ArrowUp', 'Enter', ' ', 'Home', 'End'].forEach((key) => {
    it('opens the list box with "' + key + '"', async () => {
      const dropdown = await fixture(html`
          <dropdown-selector>
              <option>Some Value</option>
              <option selected>Another Value</option>
          </dropdown-selector>
      `);

      const combobox = dropdown.shadowRoot.getElementById('combobox');
      await combobox.focus();

      await sendKeys({
        press: key
      });

      expect(dropdown.shadowRoot.activeElement).to.equal(combobox);
      expect(combobox.getAttribute('aria-expanded')).to.equal('true');

      const listbox = dropdown.shadowRoot.getElementById('listbox');
      expect(listbox.clientHeight).to.be.greaterThan(0);
    });
  });

  [
    { key: 'ArrowUp', expectedIndex: 11 },
    { key: 'ArrowDown', expectedIndex: 13 },
    { key: 'PageUp', expectedIndex: 2},
    { key: 'PageDown', expectedIndex: 22 },
    { key: 'Home', expectedIndex: 0 },
    { key: 'End', expectedIndex: 25 },
  ].forEach(({key, expectedIndex}) => {
    it('changes the active index with a key press "' + key + '"', async () => {
      const dropdown = await fixture(html`
          <dropdown-selector>
              <option>asdf</option>
              <option>sdfg</option>
              <option>dfgh</option>
              <option>fghj</option>
              <option>ghjk</option>
              <option>qwer</option>
              <option>wert</option>
              <option>erty</option>
              <option>rtyu</option>
              <option>tyui</option>
              <option>yuio</option>
              <option>uiop</option>
              <option selected>zxcv</option> // 11
              <option>xcvb</option>
              <option>asdf</option>
              <option>sdfg</option>
              <option>dfgh</option>
              <option>fghj</option>
              <option>ghjk</option>
              <option>qwer</option>
              <option>wert</option>
              <option>erty</option>
              <option>rtyu</option>
              <option>tyui</option>
              <option>yuio</option>
              <option>uiop</option>
          </dropdown-selector>
      `);

      const combobox = dropdown.shadowRoot.getElementById('combobox');
      await combobox.click();

      await sendKeys({
        press: key
      });

      expect(dropdown.__currentIndex).to.equal(expectedIndex);
    });
  });

  it('close the list without saving when pressing the "Escape" key', async () => {
    const dropdown = await fixture(html`
          <dropdown-selector>
              <option>Some Value</option>
              <option selected>Another Value</option>
          </dropdown-selector>
      `);

    const combobox = dropdown.shadowRoot.getElementById('combobox');
    await combobox.click();

    await sendKeys({
      press: 'ArrowUp',
    });

    await sendKeys({
      press: 'Escape',
    });

    expect(dropdown.selectedIndex).to.equal(1);
    expect(dropdown.value).to.equal('Another Value');

    expect(dropdown.shadowRoot.activeElement).to.equal(combobox);
    expect(combobox.getAttribute('aria-expanded')).to.equal('false');

    const listbox = dropdown.shadowRoot.getElementById('listbox');
    expect(listbox.clientHeight).to.equal(0);
  });

  ['Enter', ' '].forEach((key) => {
    it('closes the list and saves when pressing the "' + key + '" key', async () => {
      const dropdown = await fixture(html`
          <dropdown-selector>
              <option>Some Value</option>
              <option selected>Another Value</option>
          </dropdown-selector>
      `);

      const combobox = dropdown.shadowRoot.getElementById('combobox');
      await combobox.click();

      await sendKeys({
        press: 'ArrowUp',
      });

      await sendKeys({
        press: key,
      });

      expect(dropdown.selectedIndex).to.equal(0);
      expect(dropdown.value).to.equal('Some Value');

      expect(dropdown.shadowRoot.activeElement).to.equal(combobox);
      expect(combobox.getAttribute('aria-expanded')).to.equal('false');

      const listbox = dropdown.shadowRoot.getElementById('listbox');
      expect(listbox.clientHeight).to.equal(0);
    });
  });
});