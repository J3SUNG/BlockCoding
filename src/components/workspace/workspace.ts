import { UpdateWorkspaceDataAll, UpdateWorkspaceDataValue, WorkspaceData } from '../../types/stateType';
import { createElementCommon } from '../../utils/createElementCommon';
import { deepCopy } from '../../utils/deepCopy';
import { createUniqueId } from '../../utils/createUniqueId';
import { BlockObject, BlockObjectValue } from '../../types/blockObject';
import { findTargetBlock } from '../../utils/findTargetBlock';
import { createBlock } from '../../classes/factory/createBlock';

interface WorkspaceProps {
  workspaceData: WorkspaceData;
  updateWorkspaceDataAll: UpdateWorkspaceDataAll;
  updateWorkspaceDataValue: UpdateWorkspaceDataValue;
}

export const workspace = ({ workspaceData, updateWorkspaceDataAll, updateWorkspaceDataValue }: WorkspaceProps) => {
  const section = createElementCommon('section', { id: 'workspace' });
  const trashBin = createElementCommon('div', { id: 'trash-bin' });
  const trashIcon = createElementCommon('span', { className: 'material-symbols-outlined', textContent: 'delete' });

  section.addEventListener('dragover', function (event: DragEvent) {
    event.preventDefault();
  });

  section.addEventListener('drop', function (event: DragEvent) {
    event.preventDefault();
    if (event.target !== section) {
      const target = event.target as Element;
      const targetBlockId = target.closest('div')?.id ?? '';
      const dragBlockName = event.dataTransfer!.getData('name');
      const dragBlockType = event.dataTransfer!.getData('type');

      const newWorkspaceData = onDropAnotherBlock(targetBlockId, dragBlockName, dragBlockType, workspaceData);
      updateWorkspaceDataAll(newWorkspaceData!);
    } else {
      const newWorkspaceData = onDropWorkspace(section, event, workspaceData);
      updateWorkspaceDataAll(newWorkspaceData);
    }
  });

  workspaceData.forEach((obj) => {
    paintWorkspace(section, obj, { x: obj.data.x, y: obj.data.y, index: 0 }, updateWorkspaceDataValue);
  });

  return section;
};

const onDropWorkspace = (section: HTMLElement, event: DragEvent, workspaceData: WorkspaceData) => {
  const newWorkspaceData = deepCopy(workspaceData);
  const name = event.dataTransfer!.getData('name');
  const offsetX = event.dataTransfer?.getData('offsetX');
  const offsetY = event.dataTransfer?.getData('offsetY');
  const rect = section.getBoundingClientRect();
  const x = event.clientX - rect.left - Number(offsetX);
  const y = event.clientY - rect.top - Number(offsetY);

  const uniqueId = createUniqueId();
  const newBlock = createBlock(name, uniqueId, x, y);
  newWorkspaceData.push(newBlock);

  return newWorkspaceData;
};

export const onDropAnotherBlock = (
  targetBlockId: string,
  dragBlockName: string,
  dragBlockType: string,
  workspaceData: BlockObject[],
) => {
  const newWorkspaceData = deepCopy(workspaceData);
  const targetBlock = findTargetBlock(targetBlockId, newWorkspaceData);
  if (!targetBlock) {
    return;
  }

  const uniqueId = createUniqueId();
  const newBlock = createBlock(dragBlockName, uniqueId, 0, 0);

  targetBlock.insertBlock(newBlock);

  return newWorkspaceData;
};

const paintWorkspace = (
  parent: HTMLElement,
  obj: BlockObjectValue,
  data: {
    x: number;
    y: number;
    index?: number;
  },
  updateWorkspaceDataValue: UpdateWorkspaceDataValue,
  setPosition?: (x: number, y: number, index: number) => { childX: number; childY: number },
) => {
  if (!obj) {
    return;
  }

  if (Array.isArray(obj)) {
    obj.forEach((item, itemIndex) => {
      paintWorkspace(
        parent,
        item,
        { x: data.x, y: data.y, index: itemIndex + (data.index ?? 0) },
        updateWorkspaceDataValue,
        setPosition,
      );
    });
  } else {
    if (typeof obj !== 'string' && obj.data && (obj.data.value || obj.data.value == '')) {
      let newX = data.x;
      let newY = data.y;
      if (setPosition) {
        const { childX, childY } = setPosition(data.x, data.y, data.index!);
        newX = childX;
        newY = childY;
      }

      if (obj.paintBlock) {
        const div = obj.paintBlock(obj.data.id, newX, newY, obj.data.value, updateWorkspaceDataValue);
        parent.appendChild(div);

        obj.getInnerBlock().forEach((item, itemIndex) => {
          paintWorkspace(
            div,
            item,
            { x: newX, y: newY, index: itemIndex },
            updateWorkspaceDataValue,
            obj.setChildPosition,
          );
        });
      }
    }
  }
};
