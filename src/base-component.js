export class BaseComponent extends HTMLElement {
  attachLabelForAria(labelledElements) {
    if (!this.id) {
      return;
    }

    this.__parentLabel = document.querySelector(`[for=${this.id}]`);
    if (this.__parentLabel) {
      this.__label = document.createElement('label');
      this.__label.setAttribute('id', 'label');
      this.__label.textContent = this.__parentLabel.textContent;

      this.shadowRoot.appendChild(this.__label);

      labelledElements.forEach((element) => {
        element.setAttribute('aria-labelledby', 'label');
      });

      this.__parentLabel.addEventListener('click', this.click.bind(this));

      const style = document.createElement('style');
      style.textContent = '#label { position: absolute; left: -1000px}';

      this.shadowRoot.appendChild(style);
    }

    this.__labelObserver = new MutationObserver((changes) => {
      if (changes[0]?.target === this.__parentLabel) {
        this.__label.textContent = this.__parentLabel.textContent;
      }
    });
    this.__labelObserver.observe(this.__parentLabel, { childList: true });
  }

  applyStyles() {
    const nodeName = this.nodeName.toLowerCase();
    const styleSheet = document.createElement('style');
    this.shadowRoot.appendChild(styleSheet);

    Array.from(this.classList).forEach((cssClass) => {
      this.__root.classList.add(cssClass);
    });

    Array.from(document.styleSheets).forEach((outerStyleSheet) => {
      Array.from(outerStyleSheet.cssRules).forEach((cssRule) => {
        if (cssRule.selectorText && cssRule.selectorText.startsWith(nodeName)) {
          const rule = cssRule.cssText.replace(nodeName, ':host > *:first-child');
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
    if (this.__parentLabel) {
      this.shadowRoot.querySelectorAll(`[aria-labelledby]`).forEach((element) => {
        element.removeAttribute('aria-labelledby');
      });

      this.__label.remove();
      this.__labelObserver.disconnect();

      if (this.click !== undefined) {
        this.__parentLabel.removeEventListener('click', this.click.bind(this));
      }
    }

    this.shadowRoot.querySelectorAll('style').forEach((element) => {
      element.remove();
    });
  }
}