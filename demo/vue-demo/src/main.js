import { createApp } from 'vue'
import App from './App.vue'

import '../../base.css';

import {DropdownSelector} from "../../../src/dropdown-selector.js";

createApp(App).mount('#app')

customElements.define('dropdown-selector', DropdownSelector);