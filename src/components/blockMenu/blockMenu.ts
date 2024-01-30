import { SelectedType, UpdateSelectedType } from '../../types/stateType';
import { createElementCommon } from '../../utils/createElementCommon';
import { blockMenuBlockNav } from './blockMenuBlockNav';
import { blockMenuTypeNav } from './blockMenuTypeNav';

interface BlockMenuProps {
  selectedType: SelectedType;
  updateSelectedType: UpdateSelectedType;
}

export const blockMenu = ({ selectedType, updateSelectedType }: BlockMenuProps) => {
  const blockMenuDiv = createElementCommon('div', { id: 'block-menu' });
  const blockTypeNav = blockMenuTypeNav({ updateSelectedType });
  const blockNav = blockMenuBlockNav({
    selectedType,
  });

  blockMenuDiv.appendChild(blockTypeNav);
  blockMenuDiv.appendChild(blockNav);

  return blockMenuDiv;
};
