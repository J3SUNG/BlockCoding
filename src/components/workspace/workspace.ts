import { BlockList, SetBlockList } from '../../types/stateType';
import { createElementCommon } from '../../utils/createElementCommon';
import { workspaceSection } from './workspaceSection';

interface WorkspaceProps {
  blockList: BlockList;
  setBlockList: SetBlockList;
}

export const workspace = ({ blockList, setBlockList }: WorkspaceProps) => {
  const section = workspaceSection({ blockList, setBlockList });
  const trashBin = createElementCommon('div', { id: 'trash-bin' });
  const trashIcon = createElementCommon('span', { className: 'material-symbols-outlined', textContent: 'delete' });

  trashBin.appendChild(trashIcon);
  section.appendChild(trashBin);

  return section;
};
