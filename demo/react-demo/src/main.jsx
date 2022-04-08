import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import '../../base.css'
import App from './App'

import {DropdownSelector} from "../../../src/dropdown-selector.js";

customElements.define('dropdown-selector', DropdownSelector);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
