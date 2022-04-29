import { createApp } from 'vue'
import App from './App.vue'

import '../common/base.css'

import {DropdownSelector} from "../../../src/DropdownSelector.js"

customElements.define('dropdown-selector', DropdownSelector)

createApp(App).mount('#app')