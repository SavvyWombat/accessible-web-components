import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import '../common/base.css'
import App from './App'

import {DropdownSelector} from "../../../src/DropdownSelector.js";

customElements.define('dropdown-selector', DropdownSelector);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
