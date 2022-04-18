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

      this.__labelObserver = new MutationObserver((changes) => {
        if (changes[0]?.target === this.__parentLabel) {
          this.__label.textContent = this.__parentLabel.textContent;
        }
      });
      this.__labelObserver.observe(this.__parentLabel, { childList: true });
    }
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