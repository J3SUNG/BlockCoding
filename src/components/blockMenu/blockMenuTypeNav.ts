import { BLOCK_TYPE_OBJECT } from '../../constants/blockTypeObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { SelectedType, SetSelectedType, SetSelectedTypeBlock } from '../../types/stateType';
import { blockType } from '../block/blockType';

interface BlockMenuTypeNavProps {
  selectedType: SelectedType;
  setSelectedType: SetSelectedType;
  setSelectedTypeBlock: SetSelectedTypeBlock;
}

export const blockMenuTypeNav = ({ selectedType, setSelectedType, setSelectedTypeBlock }: BlockMenuTypeNavProps) => {
  const blockTypeNav = createElementCommon('nav', { id: 'block-menu__nav-type' });
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');

  const typeBlockListG = document.createElementNS('http://www.w3.org/2000/svg', 'g');

  BLOCK_TYPE_OBJECT.forEach((block, index) => {
    const typeBlockG = blockType({
      x: 15,
      y: 80 * index,
      width: 100,
      height: 60,
      type: block.name,
      korName: block.korName,
    });

    typeBlockG.addEventListener('click', () => {
      setSelectedType(index);
      setSelectedTypeBlock(-1);
    });

    typeBlockListG.appendChild(typeBlockG);
  });

  svg.appendChild(typeBlockListG);
  blockTypeNav.appendChild(svg);

  return blockTypeNav;
};
