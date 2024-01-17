import { BLOCK_TYPE_OBJECT } from '../../constants/blockTypeObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { SelectedType, SetSelectedType, SetSelectedTypeBlock } from '../../types/stateType';

interface BlockMenuTypeNavProps {
  selectedType: SelectedType;
  setSelectedType: SetSelectedType;
  setSelectedTypeBlock: SetSelectedTypeBlock;
}

export const blockMenuTypeNav = ({ selectedType, setSelectedType, setSelectedTypeBlock }: BlockMenuTypeNavProps) => {
  const blockTypeNav = createElementCommon('nav', {});

  BLOCK_TYPE_OBJECT.forEach((blockType, index) => {
    const button = createElementCommon('button', {
      textContent: blockType.korName,
      className: `${selectedType === index ? 'bg-yellow' : 'bg-lightgray'}`,
    });

    button.onclick = () => {
      setSelectedType(index);
      setSelectedTypeBlock(-1);
    };

    blockTypeNav.appendChild(button);
  });

  return blockTypeNav;
};
