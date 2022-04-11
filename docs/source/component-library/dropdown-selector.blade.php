---
title: Dropdown Selector
---

@extends('_layouts.default');

@section('content')
    <div class="flex flex-col gap-16 mt-8 my-16">
        <section class="p-8 pb-8 bg-gray-100 shadow-inner rounded-2xl border-2 border-gray-300">
            <h1 class="text-3xl font-bold text-blue-500">Dropdown Selector</h1>

            <pre class="mt-4"><code class="html-tag">dropdown-selector</code></pre>
        </section>

        <section class="p-8 pb-12 bg-gray-100 shadow-inner shadow-red-300 rounded-2xl border-2 bg-red-100">
            <p class="text-red-600 font-bold">
                Work in progress
            </p>

            <p class="mt-4">
                I'm currently working on the design of the documentation and how to include demonstrations and code examples for the components.
            </p>
        </section>

        <section class="p-8 pb-12 bg-gray-100 shadow-inner rounded-2xl border-2 border-gray-300">
            <h2 class="text-3xl font-bold text-blue-500">Demonstration</h2>
        </section>

        <section class="p-8 pb-12 bg-gray-100 shadow-inner rounded-2xl border-2 border-gray-300">
            <h2 class="text-3xl font-bold text-blue-500">Accessibility</h2>

            <p class="mt-4">
                If a <code class="html-tag">label</code> has been associated to the <code class="html-tag">dropdown-selector</code>, then clicking on the label will open the list of options for the selector.
            </p>

            <p class="mt-4">
                Keyboard navigation is also available. The element is focusable with
                <kbd>tab</kbd>.
            </p>

            <h3 class="mt-4 text-2xl text-blue-500">When closed</h3>

            <ul class="flex flex-col gap-2 mt-4 ml-4 list-disc">
                <li><kbd>tab</kbd> will focus the next focusable element</li>
                <li><kbd>up</kbd> <kbd>down</kbd> <kbd>enter</kbd> or <kbd>space</kbd> will open the list with the current option highlighted</li>
                <li><kbd>home</kbd> will open the list with the first option highlighted</li>
                <li><kbd>end</kbd> will open the list with the last option highlighted</li>
                <li>Typing will open the list. When the user pauses typing, the next option that begins with what the user typed in will be highlighted</li>
            </ul>

            <h3 class="mt-4 text-2xl text-blue-500">When open</h3>

            <ul class="flex flex-col gap-2 mt-4 ml-4 list-disc">
                <li><kbd>escape</kbd> will close the dropdown without changing its value</li>
                <li><kbd>tab</kbd> will change the selected value to the current highlighted value, close the menu, and then move focus to the next element</li>
                <li><kbd>enter</kbd> or <kbd>space</kbd> will change the selected value to the current highlighted value, close the menu, but keep focus on the dropdown</li>
                <li><kbd>up</kbd> or <kbd>down</kbd> will move the highlight up or down the list</li>
                <li><kbd>page up</kbd> or <kbd>page down</kbd> will move the highlight up or down the list in jumps of ten</li>
                <li><kbd>home</kbd> will highlight the first option</li>
                <li><kbd>end</kbd> will highlight the last option</li>
                <li>If the user begins to type, and then pauses, the next option that begins with what the user typed in will be highlighted</li>
            </ul>

            <h3 class="mt-4 text-2xl text-blue-500">Screen readers</h3>

            <p class="mt-4">
                Screen reader users will be informed that they have focused a <em>combobox</em>, along with the label associated with the <code class="html-tag">dropdown-selector</code>, and that it can open a <em>listbox</em> with options.
            </p>

            <p class="mt-4">
                On opening the <em>listbox</em>, the user will be informed of how many items are in the list and what the current setting is, and as they use the keyboard to navigate up and down the list, they will be told which option they are hovering over.
            </p>
        </section>

        <section class="p-8 pb-12 bg-gray-100 shadow-inner rounded-2xl border-2 border-gray-300">
            <h2 class="text-3xl font-bold text-blue-500">Example code</h2>
        </section>

        <section class="p-8 pb-12 bg-gray-100 shadow-inner rounded-2xl border-2 border-gray-300">
            <h2 class="text-3xl font-bold text-blue-500">API</h2>
        </section>

        <section class="p-8 pb-12 bg-gray-100 shadow-inner rounded-2xl border-2 border-gray-300">
            <h2 class="text-3xl font-bold text-blue-500">More information</h2>

            <ul class="mt-4 ml-6 list-disc">
                <li>
                    <a href="https://w3c.github.io/aria-practices/examples/combobox/combobox-select-only.html"
                       class="underline text-blue-700 rounded
                              outline-offset-0
                              focus:no-underline focus:outline focus:outline-2 focus:outline-blue-700
                              hover:no-underline hover:outline hover:outline-2 hover:outline-blue-300 hover:bg-blue-300"
                    >WAI-ARIA Authoring Practices: Select-Only Combobox Example</a>
                </li>
            </ul>
        </section>
    </div>
@endsection