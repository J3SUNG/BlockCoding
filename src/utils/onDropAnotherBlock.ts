import { BLOCK_OBJECT } from '../constants/blockObject';
import { BlockObject } from '../types/blockObject';
import { IncreaseSeqNo, SeqNo } from '../types/stateType';
import { deepCopyObject } from './deepCopyObject';

interface OnDropAnotherBlockProps {
  targetUniqueId: string;
  name: string;
  type: string;
  obj: BlockObject | BlockObject[] | string;
  seqNo: SeqNo;
  increaseSeqNo: IncreaseSeqNo;
}

interface BlockOverlapEventProps {
  obj: BlockObject;
  name: string;
  type: string;
}

export const onDropAnotherBlock = ({
  targetUniqueId,
  name,
  type,
  obj,
  seqNo,
  increaseSeqNo,
}: OnDropAnotherBlockProps) => {
  if (!obj) return;

  if (Array.isArray(obj)) {
    for (const item of obj) {
      onDropAnotherBlock({ targetUniqueId, name, type, obj: item, seqNo, increaseSeqNo });
    }
  } else if (typeof obj === 'object' && 'data' in obj && obj.data.value) {
    if (obj.data.id === targetUniqueId) {
      // TODO: any 타입 지정
      const value: any = blockOverlapEvent({ obj, name, type });

      if (value) {
        const uniqueId = `unique-id__${seqNo}`;

        const deepCopiedObj = deepCopyObject({ obj: BLOCK_OBJECT[name] });
        deepCopiedObj.data.id = uniqueId;
        increaseSeqNo();

        if (Array.isArray(value)) {
          value.push(deepCopiedObj);
        } else {
          obj.data.value = deepCopiedObj;
        }
      }

      return;
    }

    onDropAnotherBlock({ targetUniqueId, name, type, obj: obj.data.value, seqNo, increaseSeqNo });
  }
};

const blockOverlapEvent = ({ obj, name, type }: BlockOverlapEventProps) => {
  const targetType = obj.type;
  if (targetType === 'declare') {
    if (type === 'general' || type === 'control') {
      // TODO: 선언 블럭 안에 일반, 제어 블럭 삽입
      return obj.data.value;
    }
  } else if (targetType === 'general') {
    if (type === 'general' || type === 'control') {
      // TODO: 일반 블럭 위, 아래에 일반, 제어 블럭 연결
    } else if (type === 'expressionValue' || type === 'expressionLogical') {
      // TODO: 일반 블럭의 값에 표현식 삽입
      if (name === 'value') {
        return obj.data.value;
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

  return null;
};
