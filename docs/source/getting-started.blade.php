---
title: Getting Started
---

@extends('_layouts.default')

@section('content')
  <section>
    <h1>Getting Started</h1>

    <p>
      The package is available on <a href="https://www.npmjs.com/package/@savvywombat/accessible-web-components">NPM</a>.
    </p>
  </section>

  <section>
    <h2>Installation</h2>

    <h3>Installation as a package</h3>

    <pre>
      <x-torchlight-code language="bash">npm require @savvywombat/accessible-web-components</x-torchlight-code>
    </pre>

    <pre>
      <x-torchlight-code language="bash">yarn add @savvywombat/accessible-web-components</x-torchlight-code>
    </pre>

    <h3>Download as a tarball</h3>

    <pre>
        <x-torchlight-code language="bash">
            npm pack @savvywombat/accessible-web-components
            tar -xzf savvywombat-accessible-web-components-{version}.tgz
        </x-torchlight-code>
    </pre>
  </section>

  <section>
    <h2>Vanilla JavaScript</h2>

    <p>
      Import the package as a module in your HTML document:
    </p>

    <pre>
      <x-torchlight-code language="html">
<head>
    <script type="module">
        import {defineAccessibleWebComponents} from '@savvywombat/accessible-web-components/index.js';

        defineAccessibleWebComponents();
    </script>
</head>
      </x-torchlight-code>
    </pre>

    <p>
      The import automatically defines all Web Components in the library, ready to use.
    </p>

    <h3>
      Importing a specific Web Component
    </h3>

    <pre>
      <x-torchlight-code language="html">
<head>
    <script type="module">
        import {DropdownSelector} from '@savvywombat/accessible-web-components/';

        customElements.define('dropdown-selector', DropdownSelector);
    </script>
</head>
      </x-torchlight-code>
    </pre>

    <p>
      This allows you to choose an alternative name for the custom element to be used. It is recommended that custom
      elements consist of two or more words seperated by a dash, so that they are distinct from HTML standard elements.
    </p>

    <h3>Using the Web Component</h3>

    <pre>
      <x-torchlight-code language="html">
        <dropdown-selector id="month" name="month">
          <option>January</option>
          <option>February</option>
        </dropdown-selector>
      </x-torchlight-code>
    </pre>
  </section>

  <section>
    <h2>Vue.js</h2>

    <p>
      Import the package into your app's <code>main.js</code> before you call <code>createApp</code>:
    </p>

    <pre>
      <x-torchlight-code language="javascript">
import {defineAccessibleWebComponents} from '@savvywombat/accessible-web-components/index.js';
defineAccessibleWebComponents();

createApp(App).mount('#app');
      </x-torchlight-code>
    </pre>

    <p>
      The import automatically defines all Web Components in the library, ready to use.
    </p>

    <h3>
      Importing a specific Web Component
    </h3>

    <pre>
      <x-torchlight-code language="javascript">
import {DropdownSelector} from '@savvywombat/accessible-web-components/';
customElements.define('dropdown-selector', DropdownSelector);

createApp(App).mount('#app');
      </x-torchlight-code>
    </pre>

    <p>
      This allows you to choose an alternative name for the custom element to be used. It is recommended that custom
      elements consist of two or more words seperated by a dash, so that they are distinct from HTML standard elements.
    </p>

    <h3>Using the Web Component</h3>

    <pre>
      <x-torchlight-code language="vue">
<template>
  <dropdown-selector id="month"
                     name="month"
                     v-model="value"
                     @change="(event) => output = months[event.target.value]"
                     :disabled="disabled"
                     tabIndex="2"
  >
    <option v-for="(month, index) in monthList"
            :value="month"
            :key="index"
    >@{{ months[month] }}</option>
  </dropdown-selector>
</template>
      </x-torchlight-code>
    </pre>
  </section>

  <section>
    <h2>React</h2>

    <p>
      Import the package into your app's <code>main.jsx</code> before you call <code>ReactDOM.render</code>:
    </p>

    <pre>
      <x-torchlight-code language="javascript">
import {defineAccessibleWebComponents} from '@savvywombat/accessible-web-components/index.js';
defineAccessibleWebComponents();

ReactDOM.render(
        ...
      </x-torchlight-code>
    </pre>

    <p>
      The import automatically defines all Web Components in the library, ready to use.
    </p>

    <h3>
      Importing a specific Web Component
    </h3>

    <pre>
      <x-torchlight-code language="javascript">
import {DropdownSelector} from '@savvywombat/accessible-web-components/';
customElements.define('dropdown-selector', DropdownSelector);

ReactDOM.render(
        ...
      </x-torchlight-code>
    </pre>

    <p>
      This allows you to choose an alternative name for the custom element to be used. It is recommended that custom
      elements consist of two or more words seperated by a dash, so that they are distinct from HTML standard elements.
    </p>

    <h3>Using the Web Component</h3>

    <pre>
      <x-torchlight-code language="jsx">
function Page () {
  ...

  return(
    <dropdown-selector id="month"
                       name="month"
                       ref={selectorRef}
                       disabled={disabled ? '' : null}
                       value={value}
      >
        { [...Array(numMonths).keys()].map((m) => (
            <option key={m}>{months[m]}</option>
        ))}
    </dropdown-selector>
  );
}
      </x-torchlight-code>
    </pre>
  </section>

  <section>
    <h2>Other Frameworks</h2>

    <p>
      I haven't experimented much beyond the three options above, but as this library contains native Web Components that are not framework dependent, it should be usable as per the documentation of your chosen framework.
    </p>
  </section>
@endsection