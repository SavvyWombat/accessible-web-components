---
title: LabelledComponent
---

@extends('_layouts.default')

@section('content')
    <section>
        <h1>LabelledComponent</h1>

        <p>
            The <code class="js-class">LabelledComponent</code> mixin enables elements within a Web Components to be associated with suitable labels created in the DOM outside of the Web Component.
        </p>
    </section>

    <section>
        <h2>Usage</h2>

        <pre>
            <x-torchlight-code language="javascript">
import {LabelledComponent} from 'accessible-web-components';

class DropdownSelector extends LabelledComponent(HTMLElement) {
  constructor() {
    super()
      .attachShadow({mode: 'open'})
      .innerHTML = `<div><div id="labelled-element"></div></div>`;

    this.__labelledElementIds = ['labelled-element'];

    // other initialisation
  }

  connectedCallback() {
    if (this.isConnected) {
      super.connectedCallback();
    }

    // other initialisation requiring access to DOM and ShadowDOM
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    // other cleanup
  }
}
            </x-torchlight-code>
        </pre>

        <pre>
            <x-torchlight-code language="html">
<label for="choose-something">Choose something from the list</label>
<dropdown-selector id="choose-something"></dropdown-selector>

<label id="label-for-selector">Choose something from the list</label>
<dropdown-selector aria-labelledby="label-for-selector"></dropdown-selector>
            </x-torchlight-code>
        </pre>
    </section>

    <section>
        <h2>Accessibility</h2>

        <p>
            The <code class="js-class">LabelledComponent</code> mixin looks for any labels that have been associated in the DOM,
            either through a <code>for/id</code> relationship or an <code>id/aria-labelledby</code> relationship.
            It then creates a label with the same content within the Web Component and sets the <code>aria-labelledby</code> attribute on elements within the Web Component which are listed in the <code>__labelledElementIds</code> property.
        </p>

        <p>
            The label created within the Web Component is invisible to users, but will be announced by screen readers when the associated elements are focussed.
        </p>

        <p>
            The mixin will also set up appropriate listeners on the original label to set focus on the Web Component when the label is clicked.
        </p>
    </section>
@endsection