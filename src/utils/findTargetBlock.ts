import { BLOCK_OBJECT } from '../constants/blockObject';
import { BlockObject } from '../types/blockObject';
import { BLOCK_MAP } from '../constants/blockMap';
import { SeqNo, SetSeqNo } from '../types/stateType';

interface FindTargetBlockProps {
  targetUniqueId: string;
  name: string;
  type: string;
  obj: BlockObject | BlockObject[] | string;
  seqNo: SeqNo;
  setSeqNo: SetSeqNo;
}

interface BlockOverlapEventProps {
  obj: BlockObject;
  name: string;
  type: string;
}

export const findTargetBlock = ({ targetUniqueId, name, type, obj, seqNo, setSeqNo }: FindTargetBlockProps) => {
  if (!obj) return;

  if (Array.isArray(obj)) {
    for (const item of obj) {
      findTargetBlock({ targetUniqueId, name, type, obj: item, seqNo, setSeqNo });
    }
  } else if (typeof obj === 'object' && 'data' in obj && obj.data.value) {
    if (obj.data.id === targetUniqueId) {
      // TODO: any 타입 지정
      const value: any = blockOverlapEvent({ obj, name, type });

      if (value) {
        const uniqueId = `unique-id__${seqNo}`;

        const deepCopiedObj = JSON.parse(JSON.stringify(BLOCK_OBJECT[BLOCK_MAP[name]]));
        deepCopiedObj.data.id = uniqueId;
        setSeqNo(seqNo + 1);

        if (Array.isArray(value)) {
          value.push(deepCopiedObj);
        } else {
          obj.data.value = deepCopiedObj;
        }
      }

      return;
    }

    findTargetBlock({ targetUniqueId, name, type, obj: obj.data.value, seqNo, setSeqNo });
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
