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

  Object.values(BLOCK_MAP)
    .filter((block) => block.type === BLOCK_TYPE_MAP[selectedType].name)
    .forEach((block, index) => {
      const div = blockMenuBlockNavButton({
        name: block.name,
        type: block.type,
        x: 20,
        y: index * 80 + 20,
      });
      blockNav.appendChild(div);
    });

  return blockNav;
};
