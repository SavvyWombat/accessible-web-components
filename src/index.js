import {DropdownSelector} from './dropdown-selector.js';
import {TabGroup} from './tab-group.js';

export { DropdownSelector, TabGroup };

export const defineAccessibleWebComponents = () => {
  customElements.define('dropdown-selector', DropdownSelector);
  customElements.define('tab-group', TabGroup);
}