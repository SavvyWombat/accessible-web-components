<template>
    <header>
        <h1>Accessible Web Components</h1>
        <h2>Vue Demo</h2>

        <form id="form">
            <label id="label-for-dropdown">Choose a month</label>
            <dropdown-selector aria-labelledby="label-for-dropdown">
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
        </form>

        <p class="output">
            <span id="output-label">Current selection</span>:
            <output aria-labelledby="output-label">June</output>
        </p>
    </header>
</template>

<script>
import { DropdownSelector } from "../../../../src/index.js";

customElements.define('dropdown-selector', DropdownSelector);
</script>

<style>
    form {
      margin: 1rem auto;

      max-width: 768px;

      border: 3px solid #122436;
      border-radius: 0.5rem;

      padding: 3rem;
    }

    label {
      display: block;
      margin: 1rem;
    }

    p.output {
      margin: 1rem auto;

      max-width: 768px;

      border: 3px solid #122436;
      border-radius: 0.5rem;

      padding: 1rem;
    }

    output {
      margin-left: 1rem;
    }
</style>