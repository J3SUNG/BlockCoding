import { useState } from '../../core/core';
import { BLOCK_TYPE_OBJECT } from '../../constants/blockTypeObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { BlockMenuProps } from '../../types/blockMenuProps';
import { blockMenuBlockNav } from './blockMenuBlockNav';

export const blockMenu = ({ selectedBlock, setSelectedBlock, blockList, setBlockList }: BlockMenuProps) => {
  const [selectedType, setSelectedType] = useState(0);
  const [selectedTypeBlock, setSelectedTypeBlock] = useState(-1);

  const blockMenuDiv = createElementCommon('div', { id: 'block-menu' });
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

  const BlockNav = blockMenuBlockNav({
    selectedType,
    selectedBlock,
    setSelectedBlock,
    selectedTypeBlock,
    setSelectedTypeBlock,
    blockList,
    setBlockList,
  });

  blockMenuDiv.appendChild(blockTypeNav);
  blockMenuDiv.appendChild(BlockNav);

  return blockMenuDiv;
};
