import {DropdownSelector} from './DropdownSelector.js';
import {TabCard} from './TabCard.js';
import {TabGroup} from './TabGroup.js';
import {VerticalMenu} from './VerticalMenu.js';

export {LabelledComponent} from './LabelledComponent.js';
export {StyledComponent} from './StyledComponent.js';

export {
  DropdownSelector,
  TabCard,
  TabGroup,
  VerticalMenu
};

export const defineAccessibleWebComponents = () => {
  customElements.define('dropdown-selector', DropdownSelector);
  customElements.define('tab-card', TabCard);
  customElements.define('tab-group', TabGroup);
  customElements.define('vertical-menu', VerticalMenu);
}