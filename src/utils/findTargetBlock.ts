import { BlockObject, BlockObjectValue } from '../types/blockObject';

interface FindTargetBlockProps {
  targetId: string;
  obj: BlockObjectValue;
}

export const findTargetBlock = ({ targetId, obj }: FindTargetBlockProps): BlockObject | null => {
  if (!obj) {
    return null;
  }

  if (Array.isArray(obj)) {
    for (const item of obj) {
      const targetObj = findTargetBlock({ targetId, obj: item });

      if (targetObj) {
        return targetObj;
      }
    }
  } else if (typeof obj === 'object' && 'data' in obj && obj.data.value) {
    if (obj.data.id === targetId) {
      return obj;
    }

    return findTargetBlock({ targetId, obj: obj.data.value });
  }

  return null;
};
