import { useState } from '../../core/core';
import { SelectedType } from '../../types/stateType';
import { createElementCommon } from '../../utils/createElementCommon';
import { blockMenuBlockNav } from './blockMenuBlockNav';
import { blockMenuTypeNav } from './blockMenuTypeNav';

export const blockMenu = () => {
  const [selectedType, setSelectedType] = useState<SelectedType>('declare');
  const updateSelectedType = (newType: SelectedType) => {
    setSelectedType(newType);
  };

  const blockMenuDiv = createElementCommon('div', { id: 'block-menu' });
  const blockTypeNav = blockMenuTypeNav({ updateSelectedType });
  const blockNav = blockMenuBlockNav({
    selectedType,
  });

  blockMenuDiv.appendChild(blockTypeNav);
  blockMenuDiv.appendChild(blockNav);

  return blockMenuDiv;
};
