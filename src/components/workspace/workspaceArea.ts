import { WorkspaceAreaProps } from '../../types/workspaceAreaProps';
import { createElementCommon } from '../../utils/createElementCommon';

export const workspaceArea = ({ blockList }: WorkspaceAreaProps) => {
  const workspaceAreaDiv = createElementCommon('div', { id: 'block-list' });

  blockList.forEach((block) => {
    const blockDiv = createElementCommon('div', { className: 'block' });
    const blockName = createElementCommon('span', { className: 'block-name', textContent: block.korName });
    blockDiv.appendChild(blockName);
    workspaceAreaDiv.appendChild(blockDiv);
  });

  return workspaceAreaDiv;
};
