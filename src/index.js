import {DropdownSelector} from './components/DropdownSelector.js';
import {SpinButton} from './components/SpinButton.js';
import {TabCard} from './components/TabCard.js';
import {TabGroup} from './components/TabGroup.js';
import {VerticalMenu} from './components/VerticalMenu.js';

export {LabelledComponent} from './mixins/LabelledComponent.js';
export {StyledComponent} from './mixins/StyledComponent.js';

export {
  DropdownSelector,
  SpinButton,
  TabCard,
  TabGroup,
  VerticalMenu
};

export const defineAccessibleWebComponents = () => {
  customElements.define('dropdown-selector', DropdownSelector);
  customElements.define('spin-button', SpinButton);
  customElements.define('tab-card', TabCard);
  customElements.define('tab-group', TabGroup);
  customElements.define('vertical-menu', VerticalMenu);
}