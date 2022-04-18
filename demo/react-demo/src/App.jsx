import {useLayoutEffect, useRef, useState} from 'react'

function App() {
  const [disabled, setDisabled] = useState(false);
  const [label, setLabel] = useState('Pick a month')
  const [numMonths, setNumMonths] = useState(12)
  const [output, setOutput] = useState('January')
  const [value, setValue] = useState('March')
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
  ]

  const selectorRef = useRef();

  window.setTimeout(() => {
    setValue('November');
  }, 300);

  useLayoutEffect(() => {
    const {current} = selectorRef;

    const handleChange = (event) => {
      setOutput(event.target.value)
    };
    current.addEventListener('change', handleChange);

    return () => current.removeEventListener('change', handleChange);
  }, [selectorRef]);

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
            <label htmlFor="dropdown-selector">{label}</label>
            <dropdown-selector id="dropdown-selector"
                               ref={selectorRef}
                               disabled={disabled ? '' : null}
                               value={value}
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
      </main>
    </div>
  )
}

export default App
