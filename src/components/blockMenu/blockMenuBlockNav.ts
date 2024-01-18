import { BLOCK_OBJECT } from '../../constants/blockObject';
import { BLOCK_TYPE_OBJECT } from '../../constants/blockTypeObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { blockMenuBlockButton } from './blockMenuBlockButton';
import { SelectedType } from '../../types/stateType';

interface BlockMenuBlockNavProps {
  selectedType: SelectedType;
}

export const blockMenuBlockNav = ({ selectedType }: BlockMenuBlockNavProps) => {
  const blockNav = createElementCommon('nav', { id: 'nav-block' });
  const ul = createElementCommon('ul', {});

  BLOCK_OBJECT.filter((block) => block.type === BLOCK_TYPE_OBJECT[selectedType].name).forEach((block, index) => {
    const li = blockMenuBlockButton({
      name: block.name,
      type: block.type,
      x: 20,
      y: index * 80 + 20,
    });

    ul.appendChild(li!);
  });

  blockNav.appendChild(ul);

  return blockNav;
};
