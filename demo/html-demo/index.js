import '../common/base.css';

import favicon from '../../images/logo.svg';

document.getElementsByTagName('head').item(0).insertAdjacentHTML('beforeend',
  `<link rel="icon" type="image/svg" href="${favicon}">`
);

import {defineAccessibleWebComponents} from '../../src/index.js';
defineAccessibleWebComponents();