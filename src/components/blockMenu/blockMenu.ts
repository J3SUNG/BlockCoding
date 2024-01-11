import { useState } from '../../core/core';
import { BLOCK_OBJECT } from '../../constants/blockObject';
import { BLOCK_TYPE_OBJECT } from '../../constants/blockTypeObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { blockMenuProps } from '../../types/blockMenuProps';

export const blockMenu = ({ selectedBlock, setSelectedBlock }: blockMenuProps) => {
  const [selectedType, setSelectedType] = useState(0);

  const blockMenuDiv = createElementCommon('div', { id: 'block-menu' });
  const blockTypeNav = createElementCommon('nav', {});

  BLOCK_TYPE_OBJECT.forEach((blockType, index) => {
    const button = createElementCommon('button', {
      textContent: blockType.korName,
      className: `${selectedType === index ? 'bg-yellow' : 'bg-lightgray'}`,
    });
    button.onclick = () => {
      setSelectedType(index);
      setSelectedBlock(-1);
    };
    blockTypeNav.appendChild(button);
  });

  const BlockNav = createElementCommon('nav', {});
  BLOCK_OBJECT.filter((block) => block.type === BLOCK_TYPE_OBJECT[selectedType].name).forEach((block, index) => {
    const button = createElementCommon('button', {
      textContent: block.korName,
      className: `${selectedBlock === index ? 'bg-yellow' : 'bg-lightgray'}`,
    });
    button.onclick = () => {
      setSelectedBlock(index);
    };
    BlockNav.appendChild(button);
  });

  blockMenuDiv.appendChild(blockTypeNav);
  blockMenuDiv.appendChild(BlockNav);

  console.log(selectedType, selectedBlock);

  return blockMenuDiv;
};
