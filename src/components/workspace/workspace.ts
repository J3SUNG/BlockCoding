import { UpdateWorkspaceData, RefreshWorkspaceData, WorkspaceData } from '../../types/stateType';
import { createElementCommon } from '../../utils/createElementCommon';
import { deepCopy } from '../../utils/deepCopy';
import { createUniqueId } from '../../utils/createUniqueId';
import { BlockObject, BlockObjectValue } from '../../types/blockObject';
import { findTargetBlock } from '../../utils/findTargetBlock';
import { createBlock } from '../../classes/blockFactory/createBlock';
import { workspaceSection } from './workspaceSection';

interface WorkspaceProps {
  workspaceData: WorkspaceData;
  updateWorkspaceData: UpdateWorkspaceData;
  refreshWorkspaceData: RefreshWorkspaceData;
  changeBlockWidth: () => void;
}

export const workspace = ({
  workspaceData,
  updateWorkspaceData,
  refreshWorkspaceData,
  changeBlockWidth,
}: WorkspaceProps) => {
  const section = workspaceSection({
    workspaceData,
    updateWorkspaceData,
    removeTargetBlock,
    inserBlockWorkspace,
    insertBlockAnotherBlock,
    findTargetParentBlock,
  });
  const trashBin = createElementCommon('div', { id: 'trash-bin' });
  const trashIcon = createElementCommon('span', { className: 'material-symbols-outlined', textContent: 'delete' });

  workspaceData.forEach((obj) => {
    paintWorkspace(section, obj, { x: obj.data.x, y: obj.data.y, index: 0 }, refreshWorkspaceData, changeBlockWidth);
  });

  section.appendChild(trashBin);
  trashBin.appendChild(trashIcon);

  return section;
};

const paintWorkspace = (
  parent: HTMLElement,
  obj: BlockObjectValue,
  data: {
    x: number;
    y: number;
    index?: number;
  },
  refreshWorkspaceData: RefreshWorkspaceData,
  changeBlockWidth: () => void,
  parentObj?: BlockObjectValue,
) => {
  if (!obj) {
    return;
  }

  if (Array.isArray(obj)) {
    obj.forEach((item, itemIndex) => {
      paintWorkspace(
        parent,
        item,
        { x: data.x, y: data.y, index: itemIndex },
        refreshWorkspaceData,
        changeBlockWidth,
        parentObj,
      );
    });
  } else {
    if (typeof obj !== 'string' && obj.data && (obj.data.value || obj.data.value == '')) {
      let newX = data.x;
      let newY = data.y;
      if (parentObj && typeof parentObj === 'object' && !Array.isArray(parentObj)) {
        const { childX, childY } = parentObj.setChildPosition(data.index);
        newX = childX;
        newY = childY;
      }

      const { block, space } = obj.getElement(
        obj.data.id,
        newX,
        newY,
        refreshWorkspaceData,
        obj.data.value,
        changeBlockWidth,
      );
      parent.appendChild(block);

      const blockProps = [...obj.getInnerBlock(), ...obj.getChildBlock()];
      blockProps.forEach((item, itemIndex) => {
        const blockProps = obj.data[item];
        if (typeof blockProps === 'object') {
          paintWorkspace(
            space[itemIndex],
            blockProps,
            { x: newX, y: newY, index: 0 },
            refreshWorkspaceData,
            changeBlockWidth,
            obj,
          );
        }
      });
    }
  }
};

const findTargetParentBlock = (
  targetId: string,
  obj: BlockObjectValue,
  parent: BlockObject | BlockObject[],
): { parent: BlockObject | BlockObject[]; prop?: string; index?: number } | null => {
  if (!obj) {
    return null;
  }

  if (Array.isArray(obj)) {
    for (let index = 0; index < obj.length; ++index) {
      const item = obj[index];
      const result = findTargetParentBlock(targetId, item, obj);
      if (result) {
        if (result.index || result.prop || result.index === 0) {
          return result;
        } else {
          return { parent: obj, index };
        }
      }
    }
  } else if (typeof obj === 'object' && 'data' in obj) {
    if (obj.data.id === targetId) {
      return { parent };
    }

    const blockProps = [...obj.getInnerBlock(), ...obj.getChildBlock()];
    for (const prop of blockProps) {
      if (prop in obj.data) {
        const blockObj = obj.data[prop];
        if (typeof blockObj === 'object') {
          const result = findTargetParentBlock(targetId, blockObj, obj);
          if (result) {
            if (result.index || result.prop || result.index === 0) {
              return result;
            } else {
              return { parent: obj, prop };
            }
          }
        }
      }
    }
  }

  return null;
};

const removeTargetBlock = (result: { parent: BlockObject | BlockObject[]; prop?: string; index?: number } | null) => {
  if (!result) {
    return;
  }

  const { parent, prop, index } = result;

  if (Array.isArray(parent)) {
    if (typeof index === 'number') {
      if (parent.length === 1) {
        parent.length = 0;
      } else {
        parent.splice(index, 1);
      }
    }
  } else if (prop && 'data' in parent && parent.data) {
    parent.data[prop] = {} as BlockObject;
  }
};

const inserBlockWorkspace = (section: HTMLElement, event: DragEvent, workspaceData: WorkspaceData) => {
  const newWorkspaceData = deepCopy(workspaceData);
  if (event.dataTransfer) {
    const name = event.dataTransfer.getData('name');
    const offsetX = event.dataTransfer.getData('offsetX');
    const offsetY = event.dataTransfer.getData('offsetY');
    const rect = section.getBoundingClientRect();
    const x = event.clientX - rect.left - Number(offsetX);
    const y = event.clientY - rect.top - Number(offsetY);

    const uniqueId = createUniqueId();
    const newBlock = createBlock(name, uniqueId, x, y);
    newWorkspaceData.push(newBlock);
  }

  return newWorkspaceData;
};

const insertBlockAnotherBlock = (
  targetUniqueId: string,
  name: string,
  newWorkspaceData: BlockObject[],
  anotherBlock: HTMLElement,
  insertBlock?: BlockObject,
): boolean => {
  const targetObj = findTargetBlock(targetUniqueId, newWorkspaceData);

  if (targetObj) {
    const newBlock = insertBlock ? insertBlock : createBlock(name, createUniqueId(), 0, 0);
    if (anotherBlock.classList.contains('block__space')) {
      return targetObj.insert(newBlock, anotherBlock.id);
    } else {
      return targetObj.insert(newBlock);
    }
  }

  return false;
};
