import { BLOCK_TYPE_OBJECT } from '../../constants/blockTypeObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { SelectedType, SetSelectedType, SetSelectedTypeBlock } from '../../types/stateType';
import { blockMenuTypeButton } from './blockMenuTypeButton';

interface BlockMenuTypeNavProps {
  selectedType: SelectedType;
  setSelectedType: SetSelectedType;
  setSelectedTypeBlock: SetSelectedTypeBlock;
}

export const blockMenuTypeNav = ({ selectedType, setSelectedType, setSelectedTypeBlock }: BlockMenuTypeNavProps) => {
  const blockTypeNav = createElementCommon('nav', { id: 'nav-type' });
  const ul = createElementCommon('ul', {});

  BLOCK_TYPE_OBJECT.forEach((block, index) => {
    const li = blockMenuTypeButton({
      type: block.name,
      korName: block.korName,
    });

    li.addEventListener('click', () => {
      setSelectedType(index);
      setSelectedTypeBlock(-1);
    });

    ul.appendChild(li);
  });
  blockTypeNav.appendChild(ul);

  return blockTypeNav;
};
