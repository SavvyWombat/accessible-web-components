import {useLayoutEffect, useRef, useState} from 'react'

function App() {
  const [label, setLabel] = useState('Pick a month')
  const [numMonths, setNumMonths] = useState(12)
  const [output, setOutput] = useState('January')
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
  ]

  const selectorRef = useRef();

  useLayoutEffect(() => {
    const {current} = selectorRef;

    current.addEventListener('change', (event) => {
      setOutput(event.target.value)}
    );
  });

  return (
    <div>
      <header>
        <h2>Accessible Web Components</h2>
        <h3>React Demo</h3>
      </header>

      <main>
        <section className="demo">
          <h1>Dropdown Selector</h1>

          <form id="form">
            <label htmlFor="edit-dropdown-label">Edit the dropdown's label</label>
            <input id="edit-dropdown-label" type="text" value={label} onChange={(event) => setLabel(event.target.value)}/>

            <label htmlFor="number-of-options">Edit the dropdown's label</label>
            <input id="number-of-options" type="number" min="1" max="12" value={numMonths} onChange={(event) => setNumMonths(parseInt(event.target.value))}/>

            <label htmlFor="dropdown-selector">{label}</label>
            <dropdown-selector id="dropdown-selector"
                               ref={selectorRef}
            >
              { [...Array(numMonths).keys()].map((m) => (
                  <option key={m}>{months[m]}</option>
              ))}
            </dropdown-selector>

            <p className="output">
              <span id="output-label">Current selection</span>:
              <output aria-labelledby="output-label">{output}</output>
            </p>
          </form>
        </section>

        <section className="explanation">
          <h2>Developer Experience</h2>

          <p>
            &lt;option&gt; elements work just like regular HTML Option elements.
            The value attribute is optional, and a selected attribute can be used to set the initial value.
          </p>

          <pre><code>{`<label htmlFor="edit-dropdown-label">Edit the dropdown's label</label>
  <input id="edit-dropdown-label" type="text" value={label} onChange={(event) => setLabel(event.target.value)}/>

  <label htmlFor="number-of-options">Edit the dropdown's label</label>
  <input id="number-of-options" type="number" min="1" max="12" value={numMonths} onChange={(event) => setNumMonths(parseInt(event.target.value))}/>

  <label htmlFor="dropdown-selector">{label}</label>
  <dropdown-selector id="dropdown-selector">
    { [...Array(numMonths).keys()].map((m) => (
        <option key={m}>{months[m]}</option>
    ))}
  </dropdown-selector>

  <p className="output">
    <span id="output-label">Current selection</span>:
    <output aria-labelledby="output-label">{output}</output>
  </p>
</form>`}</code></pre>
        </section>
      </main>
    </div>
  )
}

export default App
