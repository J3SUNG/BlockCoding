import { createBlock } from '../../../classes/factory/createBlock';
import { BlockObject, BlockObjectValue } from '../../../types/blockObject';
import { WorkspaceData } from '../../../types/stateType';
import { createUniqueId } from '../../../utils/createUniqueId';
import { deepCopyObject } from '../../../utils/deepCopyObject';
import { findTargetBlock } from '../../../utils/findTargetBlock';

export const onDropWorkspace = (section: HTMLElement, event: DragEvent, workspaceData: WorkspaceData) => {
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
  newWorkspaceData: BlockObject[],
  inputBlock?: BlockObject | BlockObject[],
): BlockObject[] => {
  const targetObj = findTargetBlock(targetUniqueId, newWorkspaceData);
  if (!targetObj) {
    throw new Error('targetObj 에러 - 해당 id를 가진 블럭이 없습니다.');
  }
  const newObj: BlockObjectValue = blockOverlapEvent(targetObj, name, type);

  if (newObj) {
    const newBlock = inputBlock ? inputBlock : deepCopyObject(createBlock(name, createUniqueId(), 0, 0));

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
