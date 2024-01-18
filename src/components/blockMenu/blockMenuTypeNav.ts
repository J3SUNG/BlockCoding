import { BLOCK_TYPE_OBJECT } from '../../constants/blockTypeObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { SetSelectedType } from '../../types/stateType';
import { blockMenuTypeButton } from './blockMenuTypeButton';

interface BlockMenuTypeNavProps {
  setSelectedType: SetSelectedType;
}

export const blockMenuTypeNav = ({ setSelectedType }: BlockMenuTypeNavProps) => {
  const blockTypeNav = createElementCommon('nav', { id: 'nav-type' });
  const ul = createElementCommon('ul', {});

  BLOCK_TYPE_OBJECT.forEach((block, index) => {
    const li = blockMenuTypeButton({
      type: block.name,
      korName: block.korName,
    });

    li.addEventListener('click', () => {
      setSelectedType(index);
    });

    ul.appendChild(li);
  });
  blockTypeNav.appendChild(ul);

  return blockTypeNav;
};
