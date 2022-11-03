import {StyledComponent} from "./StyledComponent.js";

export class VerticalMenu extends StyledComponent(HTMLElement) {
  constructor() {
    super()
      .attachShadow({mode: 'open'})
      .innerHTML = html;
  }

  connectedCallback() {
    if (this.isConnected) {
      super.connectedCallback();

      this.__root = this.shadowRoot.getElementById('root');

      this.__root.innerHTML = this.innerHTML;

      this.__root.addEventListener('keydown', this.keydown.bind(this));
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.__root.removeEventListener('keydown', this.keydown.bind(this));
  }

  keydown(event) {
    const action = this.__actionFromKey(event);

    if (action) {
      event.preventDefault();
    }

    switch (action) {
      case Actions.NextLink:
        this.__nextLink(event.target)?.focus();
        break;
      case Actions.PrevLink:
        this.__prevLink(event.target)?.focus();
        break;
      case Actions.StepOut:
        this.__parentLink(event.target)?.focus();
        break;
      case Actions.FirstLink:
        this.__root.querySelectorAll('a')[0].focus();
        break;
      case Actions.LastLink:
        this.__root.querySelectorAll('a')[this.__root.querySelectorAll('a').length - 1].focus();
        break;
    }
  }

  __actionFromKey(event) {
    const {key, altKey, ctrlKey, metaKey} = event;

    if (key === 'Home') {
      return Actions.FirstLink;
    }

    if (key === 'End') {
      return Actions.LastLink;
    }

    if (key === 'ArrowDown') {
      return Actions.NextLink;
    }

    if (key === 'ArrowUp') {
      return Actions.PrevLink;
    }

    if (key === 'ArrowLeft') {
      return Actions.StepOut;
    }
  }

  __nextLink(target) {
    const {nextLink} = Array.from(this.__root.querySelectorAll('a')).reduce(({nextLink, previous}, current) => {
      if (!nextLink) {
        if (previous === target) {
          nextLink = current;
        }
      }

      return {nextLink, previous: current};
    }, {nextLink: null, previous: null});

    return nextLink;
  }

  __parentLink(target) {

    return null;
  }

  __prevLink(target) {
    const {prevLink} = Array.from(this.__root.querySelectorAll('a')).reduce(({prevLink, previous}, current) => {
      if (current === target) {
        prevLink = previous;
      }

      return {prevLink, previous: current}
    }, {prevLink: null, previous: null});

    return prevLink;
  }
}

const Actions = {
  NextLink: 1,
  PrevLink: 2,
  StepOut: 3,
  FirstLink: 4,
  LastLink: 5,
}

const html = `<nav id="root">

</nav>`;