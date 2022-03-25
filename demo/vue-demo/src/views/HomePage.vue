<template>
    <header>
        <h2>Accessible Web Components</h2>
        <h3>Vue Demo</h3>
    </header>

    <main>
        <section class="demo">
            <h1>Dropdown Selector</h1>

            <form id="form">
                <label for="dropdown-selector">Choose a month</label>
                <dropdown-selector id="dropdown-selector" ref="dropdown" @change="(event) => output = months[event.target.value]">
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

                <p class="output">
                    <span id="output-label">Current selection</span>:
                    <output aria-labelledby="output-label">{{ output }}</output>
                </p>
            </form>
        </section>

        <section class="explanation">
            <h2>User Experience</h2>

            <p>
                The dropdown for selecting the month should work according to the pattern and behaviour laid out in the
                <a href="https://w3c.github.io/aria-practices/examples/combobox/combobox-select-only.html">
                    Select-Only Combobox Example
                </a> at WAI-ARIA Authoring Practices 1.2.
            </p>

            <ul>
                <li>The dropdown is focusable with <kbd>tab</kbd></li>
                <li>The menu will open when <kbd>up</kbd>, <kbd>down</kbd>, <kbd>enter</kbd>, or <kbd>space</kbd> are pressed while focused</li>
                <li>The menu will open if the user starts typing</li>
            </ul>

            <p>
                When open:
            </p>

            <ul>
                <li><kbd>home</kbd> or <kbd>end</kbd> will highlight the first or last item respectively</li>
                <li><kbd>up</kbd> or <kbd>down</kbd> will move the highlight accordingly</li>
                <li><kbd>enter</kbd> or <kbd>space</kbd> will change the selected value to the current highlighted value, close the menu, but keep focus on the dropdown</li>
                <li><kbd>tab</kbd> will change the selected value to the current highlighted value, close the menu, and then move focus to the next element</li>
                <li><kbd>escape</kbd> will close the dropdown without changing its value</li>
            </ul>
        </section>

        <section class="explanation">
            <h2>Developer Experience</h2>

            <p>
                &lt;option&gt; elements work just like regular HTML Option elements.
                The value attribute is optional, and a selected attribute can be used to set the initial value.
            </p>

            <pre><code>&lt;form id="form">
    &lt;label id="label-for-dropdown">Choose a month&lt;/label>
    &lt;dropdown-selector aria-labelledby="label-for-dropdown">
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
    &lt;/dropdown-selector>
&lt;/form></code></pre>
        </section>
    </main>

    <footer>
        <p>
            Accessible Web Components created by
            <a href="https://savvywombat.com.au">Savvy Wombat</a> &copy; 2022
        </p>

        <p>
            Source code available on
            <a href="https://github.com/SavvyWombat/accessible-web-components">GitHub</a>
        </p>
    </footer>
</template>

<script setup>
import { nextTick, ref, onMounted } from 'vue';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
];

const dropdown = ref(null);
const output = ref(null);

onMounted(() => {
  nextTick(() => {
    output.value = months[dropdown.value.value];
  });
});
</script>

<style>
dropdown-selector #combobox {
  border: 3px solid #122436;
  border-radius: 0.25em;
  padding: 1em;
}

dropdown-selector #combobox:focus {
  border: 3px solid #9999ff;
}

dropdown-selector #listbox {
  height: 0;
  overflow-y: hidden;
  position: relative;
  background-color: #fafafa;
}

dropdown-selector #combobox[aria-expanded=true] ~ #listbox {
  height: auto;
  border: 3px solid #122436;
  border-radius: 0.25em;
}

dropdown-selector .option {
  padding: 1em;
}

dropdown-selector .option.current {
  outline: 2px solid #acdcfc;
  background-color: #f0f0f0;
}

dropdown-selector .option:hover {
  background-color: #acdcfc;
}
</style>