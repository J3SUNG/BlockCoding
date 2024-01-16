import { BlockMenuProps } from '../../types/blockMenu';
import { useState } from '../../core/core';
import { createElementCommon } from '../../utils/createElementCommon';
import { blockMenuBlockNav } from './blockMenuBlockNav';
import { blockMenuTypeNav } from './blockMenuTypeNav';

export const blockMenu = ({
  selectedMenuBlock,
  setSelectedMenuBlock,
  blockList,
  setBlockList,
  uniqueId,
  setUniqueId,
}: BlockMenuProps) => {
  const [selectedType, setSelectedType] = useState(0);
  const [selectedTypeBlock, setSelectedTypeBlock] = useState(-1);

  const blockMenuDiv = createElementCommon('div', { id: 'block-menu' });
  const blockTypeNav = blockMenuTypeNav({ selectedType, setSelectedType, setSelectedTypeBlock });
  const blockNav = blockMenuBlockNav({
    selectedType,
    selectedMenuBlock,
    setSelectedMenuBlock,
    setSelectedTypeBlock,
    blockList,
    setBlockList,
    uniqueId,
    setUniqueId,
  });

  blockMenuDiv.appendChild(blockTypeNav);
  blockMenuDiv.appendChild(blockNav);

  return blockMenuDiv;
};
