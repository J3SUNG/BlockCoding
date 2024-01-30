import { useState } from '../../core/core';
import { SelectedType } from '../../types/stateType';
import { createElementCommon } from '../../utils/createElementCommon';
import { blockMenuBlockNav } from './blockMenuBlockNav';
import { blockMenuTypeNav } from './blockMenuTypeNav';

interface BlockMenuProps {
  render: () => void;
}

export const blockMenu = ({ render }: BlockMenuProps) => {
  const [getSelectedType, setSelectedType] = useState<SelectedType>('selectedType', 'declare');
  const updateSelectedType = (newType: SelectedType) => {
    setSelectedType(newType);
    render();
  };

  const blockMenuDiv = createElementCommon('div', { id: 'block-menu' });
  const blockTypeNav = blockMenuTypeNav({ updateSelectedType });
  const blockNav = blockMenuBlockNav({
    selectedType: getSelectedType(),
  });

  blockMenuDiv.appendChild(blockTypeNav);
  blockMenuDiv.appendChild(blockNav);

  return blockMenuDiv;
};
