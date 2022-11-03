---
title: StyledComponent
---

@extends('_layouts.default')

@section('content')
    <section>
        <h1>StyledComponent</h1>

        <p>
            The <code class="js-class">StyledComponent</code> mixin enables Web Components to pull in style rules, making customisation simpler.
        </p>
    </section>

    <section>
        <h2>Usage</h2>

        <h3>Extending from StyledComponent in JavaScript</h3>

        <pre>
            <x-torchlight-code language="javascript">
import {StyledComponent} from 'accessible-web-components';

class DropdownSelector extends StyledComponent(HTMLElement) {
  constructor() {
    super()
      .attachShadow({mode: 'open'})
      .innerHTML = `<div></div>`;

     // other initialisation
  }

  connectedCallback() {
    if (this.isConnected) {
      super.connectedCallback();

    // other initialisation requiring access to DOM and ShadowDOM
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    // other cleanup
  }
}
            </x-torchlight-code>
        </pre>
    </section>

    <section>
        <h2>CSS Selectors</h2>

        <pre>
            <x-torchlight-code language="html">
<dropdown-selector id="target-by-id" class="pretty-selector">
</dropdown-selector>
            </x-torchlight-code>
        </pre>

        <pre>
            <x-torchlight-code language="css">
dropdown-selector {
  background-color: gray;
}

.pretty-selector {
  border: 1px solid firebrick;
}

#target-by-id {
  font-size: 2rem;
}
            </x-torchlight-code>
        </pre>

        <p>
            Style rules targeting the element, class or ID of a <code class="js-class">StyledComponent</code>
            will be applied to the root element of the Web Component, maintaining the same specificity as the original rule.
        </p>
    </section>
@endsection

