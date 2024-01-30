import { BlockObject, BlockObjectValue } from '../types/blockObject';

export const findTargetBlock = (targetId: string, obj: BlockObjectValue): BlockObject | null => {
  if (!obj) {
    return null;
  }

  if (Array.isArray(obj)) {
    const findObj = obj.find((item) => findTargetBlock(targetId, item));
    if (findObj) return findObj;
  } else if (typeof obj === 'object' && 'data' in obj && obj.data.value) {
    if (obj.data.id === targetId) {
      return obj;
    }

    return findTargetBlock(targetId, obj.data.value);
  }

  return null;
};
