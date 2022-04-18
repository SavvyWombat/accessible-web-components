export const StyledComponent = superclass => class extends superclass {
  connectedCallback() {
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
    this.shadowRoot.querySelectorAll('style').forEach((element) => {
      element.remove();
    });
  }
}