<template>
    <header>
        <h2>Accessible Web Components</h2>
        <h3>Vue Demo</h3>
    </header>

    <main>
        <section class="demo">
            <h1>Dropdown Selector</h1>

            <form id="form">
                <label for="dropdown-selector">{{ labelText }}</label>
                <dropdown-selector id="dropdown-selector" ref="dropdown" v-model="value"  @change="(event) => output = months[event.target.value]" :disabled="disabled" tabIndex="2">
                    <option v-for="(month, index) in monthList" :value="month" :key="index">{{ months[month] }}</option>
                </dropdown-selector>

                <p class="output">
                    <span id="output-label">Current selection</span>:
                    <output aria-labelledby="output-label">{{ output }}</output>
                </p>
            </form>
        </section>
    </main>
</template>

<script setup>
import { computed, nextTick, ref, onMounted } from 'vue';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
];

const dropdown = ref(null);
const output = ref(null);

const value = ref(6);

const disabled = ref(false);
const labelText = ref('Choose a month');
const numberOfOptions = ref(12);
const monthList = computed(() => {
  return [...Array(numberOfOptions.value).keys()];
});

onMounted(() => {
  nextTick(() => {
    output.value = months[dropdown.value.value];
  });
});
</script>

<style>
dropdown-selector {
  display: block;
}

dropdown-selector[disabled] {
  opacity: 0.5;
}

dropdown-selector #combobox {
  border: 3px solid #122436;
  border-radius: 0.5em;
  padding: 1em;
}

dropdown-selector #combobox:focus {
  border: 3px solid #9999ff;
}

dropdown-selector #listbox {
  background-color: #fafafa;
}

dropdown-selector #combobox[aria-expanded=true] ~ #listbox {
  border: 3px solid #122436;
  border-radius: 0.5em;
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