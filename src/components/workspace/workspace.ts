import { UpdateWorkspaceDataAll, UpdateWorkspaceDataValue, WorkspaceData } from '../../types/stateType';
import { createElementCommon } from '../../utils/createElementCommon';
import { deepCopyObject } from '../../utils/deepCopyObject';
import { createUniqueId } from '../../utils/createUniqueId';
import { blockController } from '../../utils/blockController';
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
      const uniqueId = target.closest('div')?.id ?? '';
      const name = event.dataTransfer!.getData('name');
      const type = event.dataTransfer!.getData('type');

      const newWorkspaceData = onDropAnotherBlock(uniqueId, name, type, workspaceData);
      updateWorkspaceDataAll([...newWorkspaceData]);
    } else {
      const newWorkspaceData = onDropWorkspace(section, event, workspaceData);
      updateWorkspaceDataAll([...newWorkspaceData]);
    }
  });

  workspaceData.forEach((obj) => {
    paintWorkspace(section, obj, obj.data.x, obj.data.y, 100, 50, updateWorkspaceDataValue);
  });

  return section;
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

export const onDropAnotherBlock = (
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
