---
title: Dropdown Selector
---
@extends('_layouts.default');

@section('content')
<header>
    <h1>Dropdown Selector</h1>

    <code class="html-tag">dropdown-selector</code>
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

    <pre><code>&lt;label for="dropdown-selector">Choose a month&lt;/label>
&lt;dropdown-selector id="dropdown-selector">
    &lt;option value="0">January&lt;/option>
    &lt;option value="1">February&lt;/option>
    &lt;option value="2">March&lt;/option>
    &lt;option value="3">April&lt;/option>
    &lt;option value="4">May&lt;/option>
    &lt;option value="5" selected>June&lt;/option>
    &lt;option value="6">July&lt;/option>
    &lt;option value="7">August&lt;/option>
    &lt;option value="8">September&lt;/option>
    &lt;option value="9">October&lt;/option>
    &lt;option value="10">November&lt;/option>
    &lt;option value="11">December&lt;/option>
&lt;/dropdown-selector></code></pre>
</section>

<section>
    <h2>API</h2>
</section>

<section>
    <h2>More information</h2>

    <ul>
        <li>
            <a href="https://w3c.github.io/aria-practices/examples/combobox/combobox-select-only.html">WAI-ARIA Authoring Practices: Select-Only Combobox Example</a>
        </li>
    </ul>
</section>
@endsection