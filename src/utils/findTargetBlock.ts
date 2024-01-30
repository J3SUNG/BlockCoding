import { BlockObject, BlockObjectValue } from '../types/blockObject';

export const findTargetBlock = (targetId: string, obj: BlockObjectValue): BlockObject | null => {
  if (!obj) {
    return null;
  }

  if (Array.isArray(obj)) {
    for (const item of obj) {
      const findTarget = findTargetBlock(targetId, item);
      if (findTarget) {
        return findTarget;
      }
    }
  } else if (typeof obj === 'object' && 'data' in obj && obj.data.value) {
    if (obj.data.id === targetId) {
      return obj;
    }

    return findTargetBlock(targetId, obj.data.value);
  }

  return null;
};
