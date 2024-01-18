import { useState } from '../../core/core';
import { createElementCommon } from '../../utils/createElementCommon';
import { blockMenuBlockNav } from './blockMenuBlockNav';
import { blockMenuTypeNav } from './blockMenuTypeNav';

export const blockMenu = () => {
  const [selectedType, setSelectedType] = useState(0);
  const blockMenuDiv = createElementCommon('div', { id: 'block-menu' });
  const blockTypeNav = blockMenuTypeNav({ setSelectedType });
  const blockNav = blockMenuBlockNav({
    selectedType,
  });

  blockMenuDiv.appendChild(blockTypeNav);
  blockMenuDiv.appendChild(blockNav);

  return blockMenuDiv;
};
