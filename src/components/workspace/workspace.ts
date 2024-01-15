import { paintDiagram } from '../../utils/paintDiagram';
import { WorkspaceProps } from '../../types/workspaceProps';
import { createElementCommon } from '../../utils/createElementCommon';
import { workspaceArea } from './workspaceArea';
import { paintText } from '../../utils/paintText';

export const workspace = ({ blockList }: WorkspaceProps) => {
  const section = createElementCommon('section', { id: 'workspace' });
  const trashBin = createElementCommon('div', { id: 'trash-bin' });
  const trashIcon = createElementCommon('span', { className: 'material-symbols-outlined', textContent: 'delete' });
  const workspaceAreaElement = workspaceArea({ blockList });

  let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');

  let x = 20;
  let y = 20;
  let width = 100;
  let height = 60;

  blockList.forEach((block) => {
    const path = paintDiagram({ x, y, width, height, type: block.type });
    const text = paintText({ x, y, name: block.korName });
    svg.appendChild(path);
    svg.appendChild(text);
    y += height;
  });

  section.appendChild(svg);
  trashBin.appendChild(trashIcon);
  section.appendChild(workspaceAreaElement);
  section.appendChild(trashBin);

  return section;
};
