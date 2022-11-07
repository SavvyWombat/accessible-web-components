export class VerticalMenu extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    if (this.isConnected) {
      this.addEventListener('keydown', this.keydown.bind(this));
    }
  }

  disconnectedCallback() {
    this.removeEventListener('keydown', this.keydown.bind(this));
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
        this.querySelectorAll('a')[0].focus();
        break;
      case Actions.LastLink:
        this.querySelectorAll('a')[this.querySelectorAll('a').length - 1].focus();
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
    const {nextLink} = Array.from(this.querySelectorAll('a')).reduce(({nextLink, previous}, current) => {
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
    const {prevLink} = Array.from(this.querySelectorAll('a')).reduce(({prevLink, previous}, current) => {
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