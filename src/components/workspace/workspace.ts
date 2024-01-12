import { paintDiagram } from '../../utils/paintDiagram';
import { WorkspaceProps } from '../../types/workspaceProps';
import { createElementCommon } from '../../utils/createElementCommon';
import { workspaceArea } from './workspaceArea';

export const workspace = ({ blockList }: WorkspaceProps) => {
  const section = createElementCommon('section', { id: 'workspace' });
  const trashBin = createElementCommon('div', { id: 'trash-bin' });
  const trashIcon = createElementCommon('span', { className: 'material-symbols-outlined', textContent: 'delete' });
  const workspaceAreaElement = workspaceArea({ blockList });

  let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', 'full');
  svg.setAttribute('height', 'full');

  let x = 20;
  let y = 20;
  let width = 100;
  let height = 60;

  blockList.forEach((block) => {
    const path = paintDiagram({ x, y, width, height, type: block.type });
    svg.appendChild(path);
    y += height;
  });

  section.appendChild(svg);
  trashBin.appendChild(trashIcon);
  section.appendChild(workspaceAreaElement);
  section.appendChild(trashBin);

  return section;
};
