import {DropdownSelector} from './DropdownSelector.js';
import {TabGroup} from './TabGroup.js';

export {LabelledComponent} from './LabelledComponent.js';
export {StyledComponent} from './StyledComponent.js';

export {DropdownSelector, TabGroup};

export const defineAccessibleWebComponents = () => {
  customElements.define('dropdown-selector', DropdownSelector);
  customElements.define('tab-group', TabGroup);
}