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
  changeBlockWdith: () => void;
}

export const workspace = ({
  workspaceData,
  updateWorkspaceDataAll,
  updateWorkspaceDataValue,
  changeBlockWdith,
}: WorkspaceProps) => {
  const section = createElementCommon('div', { id: 'workspace' });
  const trashBin = createElementCommon('div', { id: 'trash-bin' });
  const trashIcon = createElementCommon('span', { className: 'material-symbols-outlined', textContent: 'delete' });

  addWorkspaceReceiveDragEvent(section, workspaceData, updateWorkspaceDataAll);
  addWorkspaceMouseDragEvent(section, workspaceData, updateWorkspaceDataAll);

  workspaceData.forEach((obj) => {
    paintWorkspace(
      section,
      obj,
      { x: obj.data.x, y: obj.data.y, index: 0 },
      updateWorkspaceDataValue,
      changeBlockWdith,
    );
  });
  changeBlockWdith();

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
  changeBlockWdith: () => void,
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
        updateWorkspaceDataValue,
        changeBlockWdith,
        parentObj,
      );
    });
  } else {
    if (typeof obj !== 'string' && obj.data && (obj.data.value || obj.data.value == '')) {
      let newX = data.x;
      let newY = data.y;
      if (parentObj && typeof parentObj === 'object' && !Array.isArray(parentObj)) {
        const { childX, childY } = parentObj.setChildPosition(data.index!);
        newX = childX;
        newY = childY;
      }

      const { block, space } = obj.getElement(
        obj.data.id,
        newX,
        newY,
        obj.data.value,
        updateWorkspaceDataValue,
        changeBlockWdith,
      );
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
            changeBlockWdith,
            obj,
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

        target.style.zIndex = '1000';
        active = true;
      }
    }
  });

  section.addEventListener('mouseup', function (e: MouseEvent) {
    e.preventDefault();
    if (active && target) {
      if (Math.abs(currentX) > 3 || Math.abs(currentY) > 3) {
        target.style.display = 'none';
        const anotherBlock = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
        const anotherBlockClosestDiv = anotherBlock.closest('div');
        target.style.display = 'flex';

        const newWorkspaceData = deepCopy(workspaceData);
        const parentData = findTargetParentBlock(target.id, newWorkspaceData, newWorkspaceData);
        const child = findTargetBlock(target.id, newWorkspaceData);
        let changeCheck = true;

        if (anotherBlock && parent && child) {
          let newChild = null;
          if (e.metaKey || e.ctrlKey) {
            newChild = deepCopy(child);
            changeUniqueIdObj(newChild);
          }

          if (anotherBlock.id === 'workspace') {
            const rect = section.getBoundingClientRect();
            const relativeX = e.clientX - rect.left - xOffset;
            const relativeY = e.clientY - rect.top - yOffset;

            if (child) {
              child.data.x = relativeX;
              child.data.y = relativeY;
              child.data.id = target.id;
            }

            if (!newChild) {
              removeTargetBlock(parentData);
            }
            newWorkspaceData.push(child);
          } else if (anotherBlockClosestDiv && anotherBlockClosestDiv.id === 'trash-bin') {
            if (!newChild) removeTargetBlock(parentData);
          } else if (anotherBlockClosestDiv) {
            if (!newChild) {
              removeTargetBlock(parentData);
              changeCheck = insertBlockAnotherBlock(
                anotherBlockClosestDiv.id as string,
                child.name,
                newWorkspaceData,
                anotherBlock.id,
                child,
              );
            } else {
              changeCheck = insertBlockAnotherBlock(
                anotherBlockClosestDiv.id as string,
                newChild.name,
                newWorkspaceData,
                anotherBlock.id,
                newChild,
              );
            }
          }
        }

        initialX = currentX;
        initialY = currentY;

        if (changeCheck) {
          updateWorkspaceDataAll(newWorkspaceData);
        } else {
        }
      }

      target.style.zIndex = '0';
      target.style.transform = 'translate(0px, 0px)';
    }
    target = null;
    active = false;
  });

  let lastHighlighted: Element | null = null;
  section.addEventListener('mousemove', function (e: MouseEvent) {
    if (active) {
      e.preventDefault();

      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;

      if (target) {
        target.style.visibility = 'hidden';
        const elementBelow = document.elementFromPoint(e.clientX, e.clientY);
        target.style.visibility = 'visible';

        if (lastHighlighted && lastHighlighted !== elementBelow) {
          lastHighlighted.classList.remove('block--highlight-drop');
        }

        if (elementBelow) {
          if (elementBelow.classList.contains('block__space') || elementBelow.classList.contains('block__child')) {
            elementBelow.classList.add('block--highlight-drop');
            lastHighlighted = elementBelow;
          } else {
            const closestBlock = elementBelow.closest('div');
            if (closestBlock?.classList.contains('block')) {
              closestBlock.classList.add('block--highlight-drop');
              lastHighlighted = closestBlock;
            }
          }
        }
      }

      if (target) {
        if (Math.abs(currentX) > 3 || Math.abs(currentY) > 3) {
          target.style.transform = 'translate(' + currentX + 'px, ' + currentY + 'px)';
        } else {
          target.style.transform = 'translate(0px, 0px)';
        }
      }
    }
  });

  section.addEventListener('mouseover', function (e: Event) {
    const target: HTMLElement = (e.target as HTMLElement).closest('div') as HTMLElement;

    if (
      (target && target.classList.contains('block')) ||
      target.classList.contains('block__space') ||
      target.classList.contains('block__child')
    ) {
      target.classList.add('block--highlight-select');
    }
  });

  section.addEventListener('mouseout', function (e: Event) {
    const target: HTMLElement = (e.target as HTMLElement).closest('div') as HTMLElement;

    if (
      (target && target.classList.contains('block')) ||
      target.classList.contains('block__space') ||
      target.classList.contains('block__child') ||
      target.classList.contains('block__operator')
    ) {
      target.classList.remove('block--highlight-select');
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

  let lastHighlighted: Element | null = null;
  section.addEventListener('dragover', function (e: DragEvent) {
    const target = e.target as HTMLElement;
    if (target) {
      const elementBelow = document.elementFromPoint(e.clientX, e.clientY);

      if (lastHighlighted && lastHighlighted !== elementBelow) {
        lastHighlighted.classList.remove('block--highlight-drop');
      }

      if (elementBelow) {
        if (elementBelow.classList.contains('block__space') || elementBelow.classList.contains('block__child')) {
          elementBelow.classList.add('block--highlight-drop');
          lastHighlighted = elementBelow;
        } else {
          const closestBlock = elementBelow.closest('div');
          if (closestBlock?.classList.contains('block')) {
            closestBlock.classList.add('block--highlight-drop');
            lastHighlighted = closestBlock;
          }
        }
      }
    }
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
      const newWorkspaceData = deepCopy(workspaceData);
      const target = e.target as Element;

      const uniqueId = target.closest('div')?.id ?? '';
      const name = e.dataTransfer.getData('name');
      if (insertBlockAnotherBlock(uniqueId, name, newWorkspaceData, target.id)) {
        updateWorkspaceDataAll(newWorkspaceData);
      }
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
  location: string,
  insertBlock?: BlockObject,
): boolean => {
  const targetObj = findTargetBlock(targetUniqueId, newWorkspaceData);

  if (targetObj) {
    const newBlock = insertBlock ? insertBlock : createBlock(name, createUniqueId(), 0, 0);
    if (location === 'space1' || location === 'space2') {
      return targetObj.insert(newBlock, location);
    } else {
      return targetObj.insert(newBlock);
    }
  }

  return false;
};

const changeUniqueIdObj = (obj: BlockObjectValue): void => {
  if (!obj) {
    return;
  }

  if (Array.isArray(obj)) {
    for (const item of obj) {
      changeUniqueIdObj(item);
    }
  } else if (typeof obj === 'object' && 'data' in obj && (obj.data.value || obj.data.value == '')) {
    const blockProps = [...obj.getInnerBlock(), ...obj.getChildBlock()];
    const newUniqueId = createUniqueId();
    obj.data.id = newUniqueId;

    for (const item of blockProps) {
      const blockObj = obj.data[item];

      if (typeof blockObj === 'object') {
        changeUniqueIdObj(blockObj);
      }
    }
  }
};
