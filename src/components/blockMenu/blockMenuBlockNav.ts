import { BLOCK_MAP } from '../../constants/blockMap';
import { BLOCK_TYPE_MAP } from '../../constants/blockTypeMap';
import { createElementCommon } from '../../utils/createElementCommon';
import { blockMenuBlockNavButton } from './blockMenuBlockNavButton';
import { SelectedType } from '../../types/stateType';

interface BlockMenuBlockNavProps {
  selectedType: SelectedType;
}

export const blockMenuBlockNav = ({ selectedType }: BlockMenuBlockNavProps) => {
  const blockNav = createElementCommon('nav', { id: 'nav-block' });
  const NAV_BLOCK_PADDING = 20;
  Object.values(BLOCK_MAP)
    .filter((block) => block.type === BLOCK_TYPE_MAP[selectedType].name)
    .forEach((block, index) => {
      const height = block.type === 'control' ? 160 : 60;
      const div = blockMenuBlockNavButton({
        name: block.name,
        type: block.type,
        x: NAV_BLOCK_PADDING + (selectedType === 'expressionLogical' ? 20 : 0),
        y: height * index + NAV_BLOCK_PADDING,
      });
      blockNav.appendChild(div);
    });

  return blockNav;
};
