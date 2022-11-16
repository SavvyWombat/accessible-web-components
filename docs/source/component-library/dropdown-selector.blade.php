---
title: Dropdown Selector
---
@extends('_layouts.default')

@section('content')
  <header>
    <h1>Dropdown Selector</h1>

    <code class="html-tag">dropdown-selector</code>

    <p>
      The dropdown selector is a form input that can be used to in place of a native select element in single mode.
    </p>
  </header>

  <section class="warning">
    <strong>
      Work in progress
    </strong>

    <p>
      I'm currently working on the design of the documentation and how to include demonstrations and code examples for
      the components.
    </p>
  </section>

  <section>
    <h2>Demonstration</h2>
  </section>

  <section>
    <h2>Accessibility</h2>

    <p>
      If a <code class="html-tag">label</code> has been associated to the <code
          class="html-tag">dropdown-selector</code>, then clicking on the label will open the list of options for the
      selector.
    </p>

    <p>
      Keyboard navigation is also available. The element is focusable with
      <kbd>tab</kbd>.
    </p>

    <h3>When closed</h3>

    <ul>
      <li><kbd>tab</kbd> will focus the next focusable element</li>
      <li><kbd>up</kbd> <kbd>down</kbd> <kbd>enter</kbd> or <kbd>space</kbd> will open the list with the current option
        highlighted
      </li>
      <li><kbd>home</kbd> will open the list with the first option highlighted</li>
      <li><kbd>end</kbd> will open the list with the last option highlighted</li>
      <li>Typing will open the list. When the user pauses typing, the next option that begins with what the user typed
        in will be highlighted
      </li>
    </ul>

    <h3>When open</h3>

    <ul>
      <li><kbd>escape</kbd> will close the dropdown without changing its value</li>
      <li><kbd>tab</kbd> will change the selected value to the current highlighted value, close the menu, and then move
        focus to the next element
      </li>
      <li><kbd>enter</kbd> or <kbd>space</kbd> will change the selected value to the current highlighted value, close
        the menu, but keep focus on the dropdown
      </li>
      <li><kbd>up</kbd> or <kbd>down</kbd> will move the highlight up or down the list</li>
      <li><kbd>page up</kbd> or <kbd>page down</kbd> will move the highlight up or down the list in jumps of ten</li>
      <li><kbd>home</kbd> will highlight the first option</li>
      <li><kbd>end</kbd> will highlight the last option</li>
      <li>If the user begins to type, and then pauses, the next option that begins with what the user typed in will be
        highlighted
      </li>
    </ul>

    <h3>Screen readers</h3>

    <p>
      Screen reader users will be informed that they have focused a <em>combobox</em>, along with the label associated
      with the <code class="html-tag">dropdown-selector</code>, and that it can open a <em>listbox</em> with options.
    </p>

    <p>
      On opening the <em>listbox</em>, the user will be informed of how many items are in the list and what the current
      setting is, and as they use the keyboard to navigate up and down the list, they will be told which option they are
      hovering over.
    </p>
  </section>

  <section>
    <h2>Example code</h2>

    <tab-group>
      <tab-card>
        <h3>Vanilla</h3>

        <pre>
                <x-torchlight-code language="html">
<label for="choose-month">Choose a month</label>
<dropdown-selector id="choose-month">
    <option value="0">January</option>
    <option value="1">February</option>
    <option value="2">March</option>
    <option value="3">April</option>
    <option value="4">May</option>
    <option value="5" selected>June</option>
    <option value="6">July</option>
    <option value="7">August</option>
    <option value="8">September</option>
    <option value="9">October</option>
    <option value="10">November</option>
    <option value="11">December</option>
</dropdown-selector>
                </x-torchlight-code>
            </pre>

      </tab-card>

      <tab-card>
        <h3>Vue.js</h3>

        <pre>
                <x-torchlight-code language="vue">
<script setup>
const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
]

const month = ref(5);
</script>

<template>
    <label for="choose-month">Choose a month</label>
    <dropdown-selector id="choose-month" v-model="month">
        <option v-for="(month, m) in months" :key="m" :value="m">@{{ month }}</option>
    </dropdown-selector>
</template>
                </x-torchlight-code>
            </pre>
      </tab-card>

      <tab-card>
        <h3>React</h3>

        <pre>
                <x-torchlight-code language="jsx">
const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
]

const [month, setMonth] = useState(5);

useLayoutEffect(() => {
    const {current} = selectorRef;

    const handleChange = (event) => {
      setOutput(event.target.value)
    };
    current.addEventListener('change', handleChange);

    return () => current.removeEventListener('change', handleChange);
  }, [selectorRef]);

return (
    <label htmlFor="choose-month" value="{month}">Choose a month</label>
    <dropdown-selector id="choose-month">
        { months.map((month, m) => (
            <option key={m} value="{m}">{month}</option>
        ))}
    </dropdown-selector>
)
                </x-torchlight-code>
            </pre>
      </tab-card>
    </tab-group>
  </section>

  <section>
    <h2>Attributes</h2>

    <p>
      The following attributes can be used on the <code class="html-tag">dropdown-selector</code> element:
    </p>

    <dl>
      <dt>autofocus</dt>
      <dd>When present, automatically focus this <code class="html-tag">dropdown-selector</code> on page load.</dd>

      <dt>disabled</dt>
      <dd>When present, makes the <code class="html-tag">dropdown-selector</code> not mutable, focusable, and prevents
        it from being submitted with the form.
      </dd>

      <dt>form</dt>
      <dd>The ID of the form that this <code class="html-tag">dropdown-selector</code> is attached to. If it is not set,
        then the <code class="html-tag">dropdown-selector</code> is attached to the closest form ancestor.
      </dd>

      <dt>name</dt>
      <dd>The name of the <code class="html-tag">dropdown-selector</code> used when submitting.</dd>

      <dt>required</dt>
      <dd>When present, determines if the <code class="html-tag">dropdown-selector</code> must have a value.</dd>

      <dt>tabIndex</dt>
      <dd>Sets where the <code class="html-tag">dropdown-selector</code> participates in sequential keyboard navigation.
      </dd>

      <dt>value</dt>
      <dd>The value of the <code class="html-tag">dropdown-selector</code>.</dd>
    </dl>
  </section>

  <section>
    <h2>API</h2>

    <p>
      The following methods and properties can be called/access on the <code class="html-tag">dropdown-selector</code>
      element:
    </p>

    <dl>
      <dt>closeList(boolean: keepFocus = true)</dt>
      <dd>Closes the list if it is open. If <code>keepFocus</code> is set to <code>true</code>, then the list will keep
        focus.
      </dd>

      <dt>openList()</dt>
      <dd>Opens the list and sets focus if the list is not already open.</dd>

      <dt>select(number: index)</dt>
      <dd>Sets the selected index of the <code class="html-tag">dropdown-selector</code>.</dd>

      <dt>add(HTMLElement: item, HTMLElement|number: before = null)</dt>
      <dd>Adds an item to the <code class="html-tag">dropdown-selector</code>. If <code>before</code> is null, then the
        new item will be appended to the end of the current list. If <code>before</code> is another item or a number, it
        will insert the new item before the specified item.
      </dd>

      <dt>item(number: index)</dt>
      <dd>Returns the item in the <code class="html-tag">dropdown-selector</code> at <code>index</code>.</dd>

      <dt>namedItem(string: name)</dt>
      <dd>Returns the item in the <code class="html-tag">dropdown-selector</code> that has a matching name or id
        attribute. If there is no matching item, it returns <code>null</code></dd>

      <dt>remove(number: index = null)</dt>
      <dd>Removes the item from the <code class="html-tag">dropdown-selector</code> at the specified index. If no index,
        then this will remove the <code class="html-tag">dropdown-selector</code> from its parent.
      </dd>

      <dt>autofocus</dt>
      <dd>Set/unset the <code class="html-tag">dropdown-selector</code>'s autofocus attribute.</dd>

      <dt>disabled</dt>
      <dd>The <code class="html-tag">dropdown-selector</code>'s disabled attribute.</dd>

      <dt>form</dt>
      <dd>The <code class="html-tag">dropdown-selector</code>'s form attribute.</dd>

      <dt>autofocus</dt>
      <dd>The <code class="html-tag">dropdown-selector</code>'s autofocus attribute.</dd>

      <dt>labels (readonly)</dt>
      <dd>Returns a NodeList of the <code class="html-tag">label</code> elements associated with the <code class="html-tag">dropdown-selector</code>.</dd>

      <dt>length (readonly)</dt>
      <dd>Returns the number of items in the <code class="html-tag">dropdown-selector</code></dd>

      <dt>name</dt>
      <dd>The <code class="html-tag">dropdown-selector</code>'s name attribute.</dd>

      <dt>options (readonly)</dt>
      <dd>Returns a NodeList of <code class="html-tag">option</code>s from the <code
            class="html-tag">dropdown-selector</code>.
      </dd>

      <dt>required</dt>
      <dd>The <code class="html-tag">dropdown-selector</code>'s required attribute.</dd>

      <dt>selectedIndex (readonly)</dt>
      <dd>Returns the selected index of the <code class="html-tag">dropdown-selector</code>.</dd>

      <dt>selectedOptions (readonly)</dt>
      <dd>Returns a nodeList of <code class="html-tag">options</code> that are currently selected in the <code
            class="html-tag">dropdown-selector</code>. This list should not contain more than one <code
            class="html-tag">option</code>, as only one option can be selected at a time.
      </dd>

      <dt>tabIndex</dt>
      <dd>The <code class="html-tag">dropdown-selector</code>'s tabIndex attribute.</dd>

      <dt>value</dt>
      <dd>The <code class="html-tag">dropdown-selector</code>'s value attribute.</dd>
    </dl>
  </section>

  <section>
    <h2>More information</h2>

    <ul>
      <li>
        <a href="https://w3c.github.io/aria-practices/#combobox">WAI-ARIA Authoring Practices 1.2:
          <wbr/>
          Combobox</a>
      </li>
      <li>
        <a href="https://w3c.github.io/aria-practices/examples/combobox/combobox-select-only.html">WAI-ARIA Authoring
          Practices 1.2:
          <wbr/>
          Select-Only Combobox Example</a>
      </li>
    </ul>
  </section>
@endsection