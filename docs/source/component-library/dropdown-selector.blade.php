---
title: Dropdown Selector
---
@extends('_layouts.default');

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
        I'm currently working on the design of the documentation and how to include demonstrations and code examples for the components.
    </p>
</section>

<section>
    <h2>Demonstration</h2>
</section>

<section>
    <h2>Accessibility</h2>

    <p>
        If a <code class="html-tag">label</code> has been associated to the <code class="html-tag">dropdown-selector</code>, then clicking on the label will open the list of options for the selector.
    </p>

    <p>
        Keyboard navigation is also available. The element is focusable with
        <kbd>tab</kbd>.
    </p>

    <h3>When closed</h3>

    <ul>
        <li><kbd>tab</kbd> will focus the next focusable element</li>
        <li><kbd>up</kbd> <kbd>down</kbd> <kbd>enter</kbd> or <kbd>space</kbd> will open the list with the current option highlighted</li>
        <li><kbd>home</kbd> will open the list with the first option highlighted</li>
        <li><kbd>end</kbd> will open the list with the last option highlighted</li>
        <li>Typing will open the list. When the user pauses typing, the next option that begins with what the user typed in will be highlighted</li>
    </ul>

    <h3>When open</h3>

    <ul>
        <li><kbd>escape</kbd> will close the dropdown without changing its value</li>
        <li><kbd>tab</kbd> will change the selected value to the current highlighted value, close the menu, and then move focus to the next element</li>
        <li><kbd>enter</kbd> or <kbd>space</kbd> will change the selected value to the current highlighted value, close the menu, but keep focus on the dropdown</li>
        <li><kbd>up</kbd> or <kbd>down</kbd> will move the highlight up or down the list</li>
        <li><kbd>page up</kbd> or <kbd>page down</kbd> will move the highlight up or down the list in jumps of ten</li>
        <li><kbd>home</kbd> will highlight the first option</li>
        <li><kbd>end</kbd> will highlight the last option</li>
        <li>If the user begins to type, and then pauses, the next option that begins with what the user typed in will be highlighted</li>
    </ul>

    <h3>Screen readers</h3>

    <p>
        Screen reader users will be informed that they have focused a <em>combobox</em>, along with the label associated with the <code class="html-tag">dropdown-selector</code>, and that it can open a <em>listbox</em> with options.
    </p>

    <p>
        On opening the <em>listbox</em>, the user will be informed of how many items are in the list and what the current setting is, and as they use the keyboard to navigate up and down the list, they will be told which option they are hovering over.
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
        <option v-for="(month, m) in months" :key="m" :value="m">{{ month }}</option>
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
    <h2>API</h2>
</section>

<section>
    <h2>More information</h2>

    <ul>
        <li>
            <a href="https://w3c.github.io/aria-practices/#combobox">WAI-ARIA Authoring Practices 1.2: <wbr/>Combobox</a>
        </li>
        <li>
            <a href="https://w3c.github.io/aria-practices/examples/combobox/combobox-select-only.html">WAI-ARIA Authoring Practices 1.2: <wbr/>Select-Only Combobox Example</a>
        </li>
    </ul>
</section>
@endsection