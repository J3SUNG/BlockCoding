import { BlockObject, BlockObjectValue } from '../../../types/blockObject';
import { UpdateWorkspaceDataAll, WorkspaceData } from '../../../types/stateType';
import { deepCopyObject } from '../../../utils/deepCopyObject';
import { findTargetBlock } from '../../../utils/findTargetBlock';
import { onDropAnotherBlock, onDropWorkspace } from './onDropEvent';

export const addWorkspaceMouseDragEvent = (
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
      const rect = target!.getBoundingClientRect();

      // 드래그 시작 시의 오프셋 계산
      xOffset = e.clientX - rect.left;
      yOffset = e.clientY - rect.top;

      initialX = e.clientX;
      initialY = e.clientY;

      active = true;
    }
  });

  section.addEventListener('mouseup', function (e: MouseEvent) {
    e.preventDefault();
    if (active && target) {
      target.style.display = 'none';
      const anotherBlock = document.elementFromPoint(e.clientX, e.clientY);
      target.style.display = 'flex';

      const newWorkspaceData = deepCopyObject(workspaceData);
      const parent = findTargetParentBlock(target.id, newWorkspaceData, newWorkspaceData);
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

          newWorkspaceData.push(child);
          removeTargetBlockOjbect(parent, target.id);
        } else if (anotherBlock.closest('div')?.id === 'trash-bin') {
          removeTargetBlockOjbect(parent, target.id);
        } else if (anotherBlock.closest('div')) {
          onDropAnotherBlock(anotherBlock.closest('div')!.id, child.name, child.type, newWorkspaceData, child);
          removeTargetBlockOjbect(parent, target.id);
        }
      }

      initialX = currentX;
      initialY = currentY;

      target = null;
      active = false;

      updateWorkspaceDataAll(newWorkspaceData);
    }
  });

  section.addEventListener('mousemove', function (e: MouseEvent) {
    if (active) {
      e.preventDefault();

      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;

      if (target) {
        target.style.transform = 'translate3d(' + currentX + 'px, ' + currentY + 'px, 0)';
      }
    }
  });
};

const findTargetParentBlock = (
  targetId: string,
  obj: BlockObjectValue,
  parent: BlockObject | BlockObject[],
): BlockObject | BlockObject[] | null => {
  if (!obj) {
    return null;
  }

  if (Array.isArray(obj)) {
    for (const item of obj) {
      const parent = findTargetParentBlock(targetId, item, obj);
      if (parent) {
        return parent;
      }
    }
  } else if (typeof obj === 'object' && 'data' in obj) {
    if (obj.data.id === targetId) {
      return parent;
    }

    return findTargetParentBlock(targetId, obj.data.value, obj);
  }

  return null;
};

const removeTargetBlockOjbect = (parent: BlockObject | BlockObject[], targetId: string) => {
  if (Array.isArray(parent)) {
    const index = parent.findIndex((item) => item.data.id === targetId);
    parent.splice(index, 1);
  } else if (typeof parent === 'object') {
    if (typeof parent.data.value === 'object') {
      parent.data.value = {} as BlockObject;
    } else if (typeof parent.data.value === 'string') {
      parent.data.value = '';
    }
  }
};

export const addWorkspaceReceiveDragEvent = (
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
      const newWorkspaceData = onDropWorkspace(section, e, workspaceData);
      updateWorkspaceDataAll(newWorkspaceData);
    } else {
      const copyWorkspaceData = deepCopyObject(workspaceData);
      const target = e.target as Element;
      const uniqueId = target.closest('div')?.id ?? '';
      const name = e.dataTransfer!.getData('name');
      const type = e.dataTransfer!.getData('type');

      const newWorkspaceData = onDropAnotherBlock(uniqueId, name, type, copyWorkspaceData);
      updateWorkspaceDataAll(newWorkspaceData);
    }
  });
};
