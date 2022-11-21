import { createApp } from 'vue'
import App from './App.vue'

import '../../common/base.css'

import {defineAccessibleWebComponents} from '../../../src/index.js';
defineAccessibleWebComponents();

createApp(App).mount('#app')