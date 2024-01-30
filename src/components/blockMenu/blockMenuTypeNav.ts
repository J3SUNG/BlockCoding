import { BLOCK_TYPE_MAP } from '../../constants/blockTypeMap';
import { createElementCommon } from '../../utils/createElementCommon';
import { UpdateSelectedType } from '../../types/stateType';
import { blockMenuTypeNavButton } from './blockMenuTypeNavButton';

interface BlockMenuTypeNavProps {
  updateSelectedType: UpdateSelectedType;
}

export const blockMenuTypeNav = ({ updateSelectedType }: BlockMenuTypeNavProps) => {
  const blockTypeNav = createElementCommon('nav', { id: 'nav-type' });
  const ul = createElementCommon('ul', {});

  Object.values(BLOCK_TYPE_MAP).forEach((type) => {
    const li = blockMenuTypeNavButton({
      type: type.name,
      korName: type.korName,
    });

    li.addEventListener('click', () => {
      updateSelectedType(type.name);
    });

    ul.appendChild(li);
  });
  blockTypeNav.appendChild(ul);

  return blockTypeNav;
};
