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
  const section = createElementCommon('div', { id: 'workspace' });
  const trashBin = createElementCommon('div', { id: 'trash-bin' });
  const trashIcon = createElementCommon('span', { className: 'material-symbols-outlined', textContent: 'delete' });

  addWorkspaceReceiveDragEvent(section, workspaceData, updateWorkspaceDataAll);
  addWorkspaceMouseDragEvent(section, workspaceData, updateWorkspaceDataAll);

  workspaceData.forEach((obj) => {
    paintWorkspace(section, obj, { x: obj.data.x, y: obj.data.y, index: 0 }, updateWorkspaceDataValue);
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

      const { block, space } = obj.getElement(obj.data.id, newX, newY, obj.data.value, updateWorkspaceDataValue);
      parent.appendChild(block);

      const blockProps = [...obj.getInnerBlock(), ...obj.getChildBlock()];
      blockProps.forEach((item, itemIndex) => {
        const blockProps = obj.data[item];
        if (typeof blockProps === 'object') {
          paintWorkspace(
            space[itemIndex],
            blockProps,
            { x: newX, y: newY, index: itemIndex },
            updateWorkspaceDataValue,
            obj.setChildPosition,
          );
        }
      });
    }
  }
};

const addWorkspaceMouseDragEvent = (
  section: HTMLElement,
  workspaceData: WorkspaceData,
  updateWorkspaceDataAll: UpdateWorkspaceDataAll,
) => {
  let active = false;
  let currentX: number;
  let currentY: number;
  let initialX: number;
  let initialY: number;
  let xOffset = 0;
  let yOffset = 0;
  let target: HTMLElement | null = null;

  section.addEventListener('mousedown', function (e: MouseEvent) {
    const trashBin = document.getElementById('trash-bin') as HTMLElement;
    const trashIcon = document.querySelector('#trash-bin > span') as HTMLElement;

    if (e.target === section || e.target === trashBin || e.target === trashIcon) {
      return;
    }

    if (e.target instanceof HTMLElement) {
      target = e.target.closest('div');

      if (target) {
        const rect = target.getBoundingClientRect();

        xOffset = e.clientX - rect.left;
        yOffset = e.clientY - rect.top;

        initialX = e.clientX;
        initialY = e.clientY;

        active = true;
      }
    }
  });

  section.addEventListener('mouseup', function (e: MouseEvent) {
    e.preventDefault();
    if (active && target && currentX && currentY) {
      target.style.display = 'none';
      const anotherBlock = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
      const anotherBlockClosestDiv = anotherBlock.closest('div');
      target.style.display = 'flex';

      const newWorkspaceData = deepCopy(workspaceData);
      const parentData = findTargetParentBlock(target.id, newWorkspaceData, newWorkspaceData);
      const child = findTargetBlock(target.id, newWorkspaceData);

      if (anotherBlock && parent && child) {
        if (anotherBlock.id === 'workspace') {
          const rect = section.getBoundingClientRect();
          const relativeX = e.clientX - rect.left - xOffset;
          const relativeY = e.clientY - rect.top - yOffset;

          if (child) {
            child.data.x = relativeX;
            child.data.y = relativeY;
            child.data.id = target.id;
          }

          removeTargetBlock(parentData);
          newWorkspaceData.push(child);
        } else if (anotherBlockClosestDiv && anotherBlockClosestDiv.id === 'trash-bin') {
          removeTargetBlock(parentData);
        } else if (anotherBlockClosestDiv) {
          removeTargetBlock(parentData);
          insertBlockAnotherBlock(anotherBlockClosestDiv.id as string, child.name, newWorkspaceData, child);
        }
      }

      initialX = currentX;
      initialY = currentY;

      updateWorkspaceDataAll(newWorkspaceData);
    }

    target = null;
    active = false;
  });

  section.addEventListener('mousemove', function (e: MouseEvent) {
    if (active) {
      e.preventDefault();

      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;

      if (target) {
        target.style.transform = 'translate(' + currentX + 'px, ' + currentY + 'px)';
      }
    }
  });
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

const addWorkspaceReceiveDragEvent = (
  section: HTMLElement,
  workspaceData: WorkspaceData,
  updateWorkspaceDataAll: UpdateWorkspaceDataAll,
) => {
  const trashBin = document.getElementById('trash-bin') as HTMLElement;
  const trashIcon = document.querySelector('#trash-bin > span') as HTMLElement;

  section.addEventListener('dragover', function (e: DragEvent) {
    e.preventDefault();
  });

  section.addEventListener('drop', function (e: DragEvent) {
    e.preventDefault();
    if (e.target === trashBin || e.target === trashIcon) {
      return;
    } else if (e.target === section) {
      const newWorkspaceData = inserBlockWorkspace(section, e, workspaceData);
      updateWorkspaceDataAll(newWorkspaceData);
    } else if (e.dataTransfer) {
      const copyWorkspaceData = deepCopy(workspaceData);
      const target = e.target as Element;

      const uniqueId = target.closest('div')?.id ?? '';
      const name = e.dataTransfer.getData('name');
      const newWorkspaceData = insertBlockAnotherBlock(uniqueId, name, copyWorkspaceData);

      updateWorkspaceDataAll(newWorkspaceData);
    }
  });
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
  insertBlock?: BlockObject,
): BlockObject[] => {
  const targetObj = findTargetBlock(targetUniqueId, newWorkspaceData);

  if (targetObj) {
    const newBlock = insertBlock ? insertBlock : createBlock(name, createUniqueId(), 0, 0);

    targetObj.insert(newBlock);
  }

  return newWorkspaceData;
};
