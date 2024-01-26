import { UpdateWorkspaceDataAll, UpdateWorkspaceDataValue, WorkspaceData } from '../../types/stateType';
import { createElementCommon } from '../../utils/createElementCommon';
import { addWorkspaceMouseDragEvent } from './utils/addWorkspaceMouseDragEvent';
import { addWorkspaceReceiveDragEvent } from './utils/addWorkspaceReceiveDragEvent';
import { BlockObjectValue } from '../../types/blockObject';
import { blockController } from '../../utils/blockController';

interface WorkspaceProps {
  workspaceData: WorkspaceData;
  updateWorkspaceDataAll: UpdateWorkspaceDataAll;
  updateWorkspaceDataValue: UpdateWorkspaceDataValue;
}

export const workspace = ({ workspaceData, updateWorkspaceDataAll, updateWorkspaceDataValue }: WorkspaceProps) => {
  const section = createElementCommon('section', { id: 'workspace' });
  const trashBin = createElementCommon('div', { id: 'trash-bin' });
  const trashIcon = createElementCommon('span', { className: 'material-symbols-outlined', textContent: 'delete' });

  addWorkspaceReceiveDragEvent(section, workspaceData, updateWorkspaceDataAll);
  addWorkspaceMouseDragEvent(section, workspaceData, updateWorkspaceDataAll);

  section.appendChild(trashBin);
  trashBin.appendChild(trashIcon);

  workspaceData.forEach((obj) => {
    paintWorkspace(section, obj, obj.data.x, obj.data.y, 100, 50, updateWorkspaceDataValue);
  });

  return section;
};

const paintWorkspace = (
  section: HTMLElement,
  obj: BlockObjectValue,
  x: number,
  y: number,
  width: number,
  height: number,
  updateWorkspaceDataValue: UpdateWorkspaceDataValue,
) => {
  if (!obj) {
    return;
  }

  if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      paintWorkspace(section, item, x, y + height * index, width, height, updateWorkspaceDataValue);
    });
  } else {
    if (typeof obj !== 'string' && obj.data && (obj.data.value || obj.data.value == '')) {
      let addX = 0;
      let addY = 0;
      if (obj.type === 'general' || obj.type === 'control') {
        addY = height;
      } else if (obj.type === 'expressionValue' || obj.type === 'expressionLogical') {
        addX = 60;
        addY = 5;
      }
      const div = blockController({
        x: x + addX,
        y: y + addY,
        name: obj.name,
        value: obj.data.value.toString(),
        id: obj.data.id,
        type: obj.type,
        onValueChange: updateWorkspaceDataValue,
      });

      section.appendChild(div);

      paintWorkspace(section, obj.data.value, x, y + addY, width, height, updateWorkspaceDataValue);
    }
  }
};
