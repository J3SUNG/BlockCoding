import { BLOCK_TYPE_OBJECT } from '../../constants/blockTypeObject';
import { BlockMenuTypeNavProps } from '../../types/blockMenuTypeNavProps';
import { createElementCommon } from '../../utils/createElementCommon';

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
