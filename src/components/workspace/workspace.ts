import { WorkspaceProps } from '../../types/workspaceProps';
import { createElementCommon } from '../../utils/createElementCommon';
import { workspaceArea } from './workspaceArea';

export const workspace = ({ blockList }: WorkspaceProps) => {
  const section = createElementCommon('section', { id: 'workspace' });
  const trashBin = createElementCommon('div', { id: 'trash-bin' });
  const trashIcon = createElementCommon('span', { className: 'material-symbols-outlined', textContent: 'delete' });
  const workspaceAreaElement = workspaceArea({ blockList });

  trashBin.appendChild(trashIcon);
  section.appendChild(workspaceAreaElement);
  section.appendChild(trashBin);

  return section;
};
