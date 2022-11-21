import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import '../../common/base.css'
import App from './App'

import {defineAccessibleWebComponents} from '../../../src/index.js';
defineAccessibleWebComponents();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
