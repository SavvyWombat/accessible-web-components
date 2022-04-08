import {useState} from 'react'
import '../../base.css';
import {DropdownSelector} from "../../../src/dropdown-selector.js";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <header>
        <h2>Accessible Web Components</h2>
        <h3>Vue Demo</h3>
      </header>

      <main>
        <section className="demo">
          <h1>Dropdown Selector</h1>

          <form id="form">
            <label for="edit-dropdown-label">Edit the dropdown's label</label>
            <input id="edit-dropdown-label" type="text"/>

            <label for="number-of-options">Edit the dropdown's label</label>
            <input id="number-of-options" type="number" min="1" max="12"/>

            <label for="dropdown-selector">Label</label>
            <dropdown-selector id="dropdown-selector">
              <option>January</option>
              <option>February</option>
              <option>March</option>
            </dropdown-selector>

            <p className="output">
              <span id="output-label">Current selection</span>:
              <output aria-labelledby="output-label">Output</output>
            </p>
          </form>
        </section>

        <section className="explanation">
          <h2>User Experience</h2>

          <p>
            The dropdown for selecting the month should work according to the pattern and behaviour laid out in the
            <a href="https://w3c.github.io/aria-practices/examples/combobox/combobox-select-only.html">
              Select-Only Combobox Example
            </a> at WAI-ARIA Authoring Practices 1.2.
          </p>

          <ul>
            <li>The dropdown is focusable with <kbd>tab</kbd></li>
            <li>The menu will open when <kbd>up</kbd>, <kbd>down</kbd>, <kbd>enter</kbd>, or <kbd>space</kbd> are
              pressed while focused
            </li>
            <li>The menu will open if the user starts typing</li>
          </ul>

          <p>
            When open:
          </p>

          <ul>
            <li><kbd>home</kbd> or <kbd>end</kbd> will highlight the first or last item respectively</li>
            <li><kbd>up</kbd> or <kbd>down</kbd> will move the highlight accordingly</li>
            <li><kbd>enter</kbd> or <kbd>space</kbd> will change the selected value to the current highlighted value,
              close the menu, but keep focus on the dropdown
            </li>
            <li><kbd>tab</kbd> will change the selected value to the current highlighted value, close the menu, and then
              move focus to the next element
            </li>
            <li><kbd>escape</kbd> will close the dropdown without changing its value</li>
          </ul>
        </section>

        <section className="explanation">
          <h2>Developer Experience</h2>

          <p>
            &lt;option&gt; elements work just like regular HTML Option elements.
            The value attribute is optional, and a selected attribute can be used to set the initial value.
          </p>

          <pre><code>{`<form id="form">
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
  </form>`}</code></pre>
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
    </div>
  )
}

export default App
