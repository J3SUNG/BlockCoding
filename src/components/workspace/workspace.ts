import { UpdateWorkspaceDataAll, UpdateWorkspaceDataValue, WorkspaceData } from '../../types/stateType';
import { createElementCommon } from '../../utils/createElementCommon';
import { blockController } from '../../utils/blockController';
import { createBlock } from '../../classes/factory/createBlock';
import { createUniqueId } from '../../utils/createUniqueId';
import { BlockObject, BlockObjectValue } from '../../types/blockObject';
import { deepCopyObject } from '../../utils/deepCopyObject';
import { findTargetBlock } from '../../utils/findTargetBlock';

interface WorkspaceProps {
  workspaceData: WorkspaceData;
  updateWorkspaceDataAll: UpdateWorkspaceDataAll;
  updateWorkspaceDataValue: UpdateWorkspaceDataValue;
}

export const workspace = ({ workspaceData, updateWorkspaceDataAll, updateWorkspaceDataValue }: WorkspaceProps) => {
  const section = createElementCommon('div', { id: 'workspace' });

  addWorkspaceReceiveDragEvent(section, workspaceData, updateWorkspaceDataAll);
  addWorkspaceMouseDragEvent(section, workspaceData, updateWorkspaceDataAll);

  section.addEventListener('drop', function (event: DragEvent) {
    event.preventDefault();
    if (event.target !== section) {
      const target = event.target as Element;
      const uniqueId = target.closest('div')?.id ?? '';
      const name = event.dataTransfer!.getData('name');
      const type = event.dataTransfer!.getData('type');

      const newWorkspaceData = insertBlockAnotherBlock(uniqueId, name, type, workspaceData);
      updateWorkspaceDataAll(newWorkspaceData);
    } else {
      const newWorkspaceData = inserBlockWorkspaceData(section, event, workspaceData);
      updateWorkspaceDataAll(newWorkspaceData);
    }
  });

  workspaceData.forEach((obj) => {
    paintWorkspace(section, obj, obj.data.x, obj.data.y, 100, 50, updateWorkspaceDataValue);
  });

  return section;
};

const inserBlockWorkspaceData = (section: HTMLElement, event: DragEvent, workspaceData: WorkspaceData) => {
  const newWorkspaceData = deepCopyObject(workspaceData);
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

export const insertBlockAnotherBlock = (
  targetUniqueId: string,
  name: string,
  type: string,
  workspaceData: BlockObject[],
) => {
  const newWorkspaceData = deepCopyObject(workspaceData);
  const targetObj = findTargetBlock(targetUniqueId, newWorkspaceData);
  if (!targetObj) {
    return;
  }
  const newObj: BlockObjectValue = blockOverlapEvent(targetObj, name, type);

  if (newObj) {
    const uniqueId = createUniqueId();

    const newBlock = deepCopyObject(createBlock(name, uniqueId, 0, 0));

    if (Array.isArray(newObj.data.value)) {
      newObj.data.value.push(newBlock);
    } else if (typeof newObj === 'object' && newObj !== null) {
      newObj.data.value = newBlock;
    }
  }

  return newWorkspaceData;
};

// TODO: 함수가 제대로 동작하지 않음 수정 필요.
const blockOverlapEvent = (obj: BlockObject, name: string, type: string): BlockObject => {
  const targetType = obj.type;
  if (targetType === 'declare') {
    if (type === 'general' || type === 'control') {
      // TODO: 선언 블럭 안에 일반, 제어 블럭 삽입
    }
  } else if (targetType === 'general') {
    if (type === 'general' || type === 'control') {
      // TODO: 일반 블럭 위, 아래에 일반, 제어 블럭 연결
    } else if (type === 'expressionValue' || type === 'expressionLogical') {
      // TODO: 일반 블럭의 값에 표현식 삽입
      if (name === 'value') {
      }
    }
  } else if (obj.type === 'control') {
    if (type === 'general' || type === 'control') {
      // TODO: 조건 블럭 내부에 일반, 제어 블럭 삽입
    } else if (type === 'expressionLogical') {
      // TODO: 조건 블럭의 조건에 논리식 삽입
    }
  } else if (obj.type === 'expressionValue') {
    if (type === 'expressionValue' || type === 'expressionLogical') {
      // TODO: 값 블럭의 값에 값, 논리식 삽입
    }
  } else if (obj.type === 'expressionLogical') {
    if (type === 'expressionValue' || type === 'expressionLogical') {
      // TODO: 논리 블럭의 값에 값, 논리식 삽입
    }
  }

  return obj;
  // EXCEPTION : blockOverlapEvent 에러
  // throw new Error('blockOverlapEvent 에러 - 예상치 못한 에러');
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
      const rect = target!.getBoundingClientRect();

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
        target.style.transform = 'translate(' + currentX + 'px, ' + currentY + 'px)';
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
    const findTarget = obj.find((item) => findTargetParentBlock(targetId, item, obj)) || null;
    if (findTarget) return obj;
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

const onDropWorkspace = (section: HTMLElement, event: DragEvent, workspaceData: WorkspaceData) => {
  const newWorkspaceData = deepCopyObject(workspaceData);
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

const onDropAnotherBlock = (
  targetUniqueId: string,
  name: string,
  type: string,
  newWorkspaceData: BlockObject[],
  inputBlock?: BlockObject | BlockObject[],
): BlockObject[] => {
  const targetObj = findTargetBlock(targetUniqueId, newWorkspaceData);
  if (!targetObj) {
    throw new Error('targetObj 에러 - 해당 id를 가진 블럭이 없습니다.');
  }

  if (targetObj) {
    const newBlock = inputBlock ? inputBlock : deepCopyObject(createBlock(name, createUniqueId(), 0, 0));

    if (Array.isArray(targetObj.data.value)) {
      targetObj.data.value.push(newBlock);
    } else if (typeof targetObj === 'object' && targetObj !== null) {
      targetObj.data.value = newBlock;
    }
  }

  return newWorkspaceData;
};
