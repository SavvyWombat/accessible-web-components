import {StyledComponent} from './StyledComponent.js';

export class TabGroup extends StyledComponent(HTMLElement) {
  constructor() {
    super()
      .attachShadow({mode: 'open'})
      .innerHTML = html;
  }

  connectedCallback() {
    if (this.isConnected) {
      super.connectedCallback();

      this.__root = this.shadowRoot.getElementById('root');

      this.__extractTabs();

      this.addEventListener('click', this.click.bind(this));
      this.addEventListener('keydown', this.keydown.bind(this));

      this.__contentObserver = new MutationObserver((changes) => {
        this.__extractTabs();
      });
      this.__contentObserver.observe(this, {childList: true});
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    [...this.__root.childNodes].forEach((child) => child.remove());

    this.removeEventListener('click', this.click.bind(this));
    this.removeEventListener('keydown', this.keydown.bind(this));
  }

  click(event) {
    const tab = event.path.find((element) => {
      return element.getAttribute && element.getAttribute('role') === 'tab';
    });

    if (tab) {
      this.__currentTab = tab;
      this.__setOpenTab(this.__currentTab);
    }
  }

  keydown(event) {
    let keyCaught = false;

    switch (event.key) {
      case 'ArrowLeft':
        this.__moveToPreviousTab();
        keyCaught = true;
        break;

      case 'ArrowRight':
        this.__moveToNextTab();
        keyCaught = true;
        break;

      case 'Home':
        this.__moveTo(this.__firstTab);
        keyCaught = true;
        break;

      case 'End':
        this.__moveTo(this.__lastTab);
        keyCaught = true;
        break;
    }

    if (keyCaught) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  __extractTabs() {
    this.__firstTab = null;
    this.__lastTab = null;
    this.__currentTab = null;
    this.__openTab = null;

    [...this.__root.childNodes].forEach((child) => child.remove());

    this.__tablist = document.createElement('div');
    this.__tablist.setAttribute('id', 'tablist');
    this.__root.appendChild(this.__tablist);

    const headings = ['h1','h2','h3','h4','h5','h6'].reduce((nodeList, heading) => {
      if (!nodeList) {
        nodeList = this.querySelectorAll(heading);
        return nodeList.length ? nodeList : undefined;
      }
      return nodeList;
    }, undefined);

    if (!headings) {
      console.error('tab-group must have at least one h1-h6 for tabs to work');
      this.__root.innerHTML = this.innerHTML;
      return;
    }

    Array.from(headings).forEach((heading, index) => {
      const tab = document.createElement('button');
      tab.setAttribute('id', `tab-${index}`)
      tab.setAttribute('type', 'button');
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', `tab-panel-${index}`);
      tab.setAttribute('aria-selected', 'false');
      tab.setAttribute('tabIndex', '-1');
      tab.appendChild(heading.cloneNode(true));
      this.__tablist.appendChild(tab);

      if (!this.__firstTab) {
        this.__firstTab = tab;
      }
      this.__lastTab = tab;


      const panel = document.createElement('section');
      panel.setAttribute('id', `tab-panel-${index}`)
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', `tab-${index}`);
      if (index) {
        panel.classList.add('hidden');
      }
      let content = heading.nextSibling;
      while (content && content.nodeName !== heading.nodeName) {
        panel.appendChild(content.cloneNode(true));
        content = content.nextSibling;
      }
      this.__root.appendChild(panel);
    });

    this.__currentTab = this.__firstTab;
    this.__setOpenTab(this.__firstTab);
  }

  __moveToNextTab() {
    if (this.__currentTab !== this.__lastTab) {
      this.__currentTab = this.__currentTab.nextSibling;
      this.__currentTab.focus();
    }
  }

  __moveToPreviousTab() {
    if (this.__currentTab !== this.__firstTab) {
      this.__currentTab = this.__currentTab.previousSibling;
      this.__currentTab.focus();
    }
  }

  __moveTo(tab) {
    this.__currentTab = tab;
    this.__currentTab.focus();
  }

  __setOpenTab(tab) {
    if (this.__openTab) {
      this.__openTab.setAttribute('aria-selected', 'false');
      this.__openTab.setAttribute('tabIndex', '-1');
      this.shadowRoot.getElementById(this.__openTab.getAttribute('aria-controls')).classList.add('hidden');
    }

    this.__openTab = tab;
    this.__openTab.setAttribute('aria-selected', 'true');
    this.__openTab.removeAttribute('tabIndex');
    this.shadowRoot.getElementById(this.__openTab.getAttribute('aria-controls')).classList.remove('hidden');
  }
}

const html = `<div id="root">
</div>

<style>
.hidden {
  display: none;
}

[aria-selected=true] {
  border: 2px solid black;
}

[role=tab]:focus {
  border: 2px solid blue;
  outline: none;
}
</style>`;