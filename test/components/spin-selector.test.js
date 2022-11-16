import { html, fixture, expect } from '@open-wc/testing';
import { SpinButton } from '../../src/index.js';

window.customElements.define('spin-selector', SpinButton);

describe('SpinSelector', () => {
  it('loads an empty spin selector', async () => {
    const spin = await fixture(html`
        <spin-selector></spin-selector>
    `);

    expect(spin.value).to.be.a('null');
    expect(spin.max).to.be.a('null');
    expect(spin.min).to.be.a('null');
    expect(spin.step).to.be.a('null');

    const label = spin.shadowRoot.getElementById('label');
    expect(label).to.be.a('null');

    const input = spin.shadowRoot.getElementById('input');
    expect(input).to.not.be.a('null');
    expect(input.value).to.equal('');
  });

  it('increments by 1 when nothing is set', async () => {
    const spin = await fixture(html`
        <spin-selector></spin-selector>
    `);

    spin.increment();

    expect(spin.value).to.equal(1);

    const input = spin.shadowRoot.getElementById('input');
    expect(input.value).to.equal('1');
  });

  it('decrements by 1 when nothing is set', async () => {
    const spin = await fixture(html`
        <spin-selector></spin-selector>
    `);

    spin.decrement();

    expect(spin.value).to.equal(-1);

    const input = spin.shadowRoot.getElementById('input');
    expect(input.value).to.equal('-1');
  });

  it('starts from a value when attribute is set', async() => {
    const spin = await fixture(html`
        <spin-selector value="10"></spin-selector>
    `);

    expect(spin.value).to.equal(10);

    const input = spin.shadowRoot.getElementById('input');
    expect(input.value).to.equal('10');
  });

  it('increments by the step attribute', async () => {
    const spin = await fixture(html`
        <spin-selector step="4"></spin-selector>
    `);

    spin.increment();

    expect(spin.value).to.equal(4);

    const input = spin.shadowRoot.getElementById('input');
    expect(input.value).to.equal('4');
  });

  it('decrements by the step attribute', async () => {
    const spin = await fixture(html`
        <spin-selector step="9"></spin-selector>
    `);

    spin.decrement();

    expect(spin.value).to.equal(-9);

    const input = spin.shadowRoot.getElementById('input');
    expect(input.value).to.equal('-9');
  });

  it('cannot step past the max value', async() => {
    const spin = await fixture(html`
        <spin-selector max="2"></spin-selector>
    `);

    spin.increment();
    expect(spin.value).to.equal(1);

    spin.increment();
    expect(spin.value).to.equal(2);

    spin.increment();
    expect(spin.value).to.equal(2);
  });

  it('cannot step past the min value', async() => {
    const spin = await fixture(html`
        <spin-selector min="-2"></spin-selector>
    `);

    spin.decrement();
    expect(spin.value).to.equal(-1);

    spin.decrement();
    expect(spin.value).to.equal(-2);

    spin.decrement();
    expect(spin.value).to.equal(-2);
  });

  [
    { min: 0, max: 4, step: 1, value: -5, expected: [0, 1, 2, 3, 4, 4] },
    { min: 0, max: 10, step: 3, value: -5, expected: [0, 3, 6, 9, 9] },
    { min: -1, max: 4, step: 1, value: -5, expected: [-1, 0, 1, 2, 3, 4, 4]},
    { min: -1, max: 10, step: 2, value: -5, expected: [-1, 1, 3, 5, 7, 9, 9]},
    { min: 1, max: 10, step: 3, value: 2, expected: [4, 7, 10, 10]},
    { min: -10, max: 10, step: 3, value: -9, expected: [-7, -4, -1, 2, 5, 8, 8]},
    { min: -10, max: 0, step: 3, value: -9, expected: [-7, -4, -1, -1]},
    { min: 0, max: 1, step: 0.1, value: -1, expected: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1]},
  ].forEach(({min, max, step, value, expected}) => {
    it(`incrementing: min="${min}" max="${max}" step="${step}" value="${value}"`, async () => {
      const spin = await fixture(html`
          <spin-selector min="${min}" max="${max}" step="${step}" value="${value}"></spin-selector>
      `);

      const result = expected.map((expected) => {
        spin.increment();
        return spin.value;
      });

      expect(result).to.eql(expected);
    });
  });

  [
    { min: 0, max: 4, step: 1, value: 10, expected: [4, 3, 2, 1, 0, 0] },
    { min: 0, max: 10, step: 3, value: 15, expected: [10, 9, 6, 3, 0, 0] },
    { min: -10, max: 5, step: 3, value: 15, expected: [5, 2, -1, -4, -7, -10, -10] },
    { min: -10, max: 5, step: 7, value: 15, expected: [5, 4, -3, -10, -10] },
    { min: 0, max: 1, step: 0.1, value: 1, expected: [0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0, 0]},
  ].forEach(({min, max, step, value, expected}) => {
    it(`decrementing: min="${min}" max="${max}" step="${step}" value="${value}"`, async () => {
      const spin = await fixture(html`
          <spin-selector min="${min}" max="${max}" step="${step}" value="${value}"></spin-selector>
      `);

      const result = expected.map((expected) => {
        spin.decrement();
        return spin.value;
      });

      expect(result).to.eql(expected);
    });
  });
});