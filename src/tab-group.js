export class TabGroup extends HTMLElement {
  constructor() {
    super()
      .attachShadow({mode: 'open'})
      .innerHTML = html;
  }

  connectedCallback() {
    if (this.isConnected) {
      this.__root = this.shadowRoot.getElementById('root');
    }

    this.__extractTabs();

    this.__contentObserver = new MutationObserver((changes) => {
      this.__extractTabs();
    });
    this.__contentObserver.observe(this, { childList: true });
  }

  __extractTabs() {
    this.__root.childNodes.forEach((child) => child.remove());

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
      if (!index) {
        tab.setAttribute('aria-selected', 'true');
      }
      this.__tablist.appendChild(tab);
      tab.appendChild(heading.cloneNode(true));

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
    })
  }
}

const html = `<div id="root">
</div>

<style>
.hidden {
  display: none;
}
</style>`;