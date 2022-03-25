export class BaseComponent extends HTMLElement {
  attachLabelForAria(labelledElements) {
    if (!this.id) {
      return;
    }

    this.parentLabel = document.querySelector(`[for=${this.id}]`);
    if (this.parentLabel) {
      this.label = document.createElement('label');
      this.label.setAttribute('id', 'label');
      this.label.textContent = this.parentLabel.textContent;

      this.shadowRoot.appendChild(this.label);

      labelledElements.forEach((element) => {
        element.setAttribute('aria-labelledby', 'label');
      });

      this.parentLabel.addEventListener('click', this.click.bind(this));

      const style = document.createElement('style');
      style.textContent = '#label { position: absolute; left: -1000px}';

      this.shadowRoot.appendChild(style);
    }
  }

  applyStyles() {
    const nodeName = this.nodeName.toLowerCase();
    const styleSheet = document.createElement('style');
    this.shadowRoot.appendChild(styleSheet);

    Array.from(this.classList).forEach((cssClass) => {
      this.root.classList.add(cssClass);
    });

    Array.from(document.styleSheets).forEach((outerStyleSheet) => {
      Array.from(outerStyleSheet.cssRules).forEach((cssRule) => {
        if (cssRule.selectorText && cssRule.selectorText.startsWith(nodeName)) {
          const rule = cssRule.cssText.replace(nodeName, ':host > *:first-child');
          console.log(rule);
          styleSheet.sheet.insertRule(rule);
        }

        if (this.id && cssRule.selectorText && cssRule.selectorText.startsWith(`#${this.id}`)) {
          const rule = cssRule.cssText.replace(`#${this.id} `, '#root ');

          styleSheet.sheet.insertRule(rule);
        }

        Array.from(this.classList).forEach((cssClass) => {
          if (cssRule.selectorText.includes(`.${cssClass}`)) {
            styleSheet.sheet.insertRule(cssRule.cssText);
          }
        });
      });
    });
  }

  disconnectedCallback() {
    if (this.parentLabel) {
      this.shadowRoot.querySelectorAll(`[aria-labelledby]`).forEach((element) => {
        element.removeAttribute('aria-labelledby');
      });

      this.label.remove();

      if (this.click !== undefined) {
        this.parentLabel.removeEventListener('click', this.click.bind(this));
      }
    }

    this.shadowRoot.querySelectorAll('style').forEach((element) => {
      element.remove();
    });
  }
}