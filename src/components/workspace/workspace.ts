import { BlockList } from '../../types/stateType';
import { createElementCommon } from '../../utils/createElementCommon';

export const workspace = ({ blockList }: { blockList: BlockList }) => {
  const section = createElementCommon('section', { id: 'workspace' });
  const trashBin = createElementCommon('div', { id: 'trash-bin' });
  const trashIcon = createElementCommon('span', { className: 'material-symbols-outlined', textContent: 'delete' });

  trashBin.appendChild(trashIcon);
  section.appendChild(trashBin);

  return section;
};
