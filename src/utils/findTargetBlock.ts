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
  } else if (typeof obj === 'object' && 'data' in obj && (obj.data.value || obj.data.value == '')) {
    if (obj.data.id === targetId) {
      return obj;
    }

    const blockProps = [...obj.getInnerBlock(), ...obj.getChildBlock()];
    for (const item of blockProps) {
      const blockObj = obj.data[item];

      if (typeof blockObj === 'object') {
        const targetObj = findTargetBlock(targetId, blockObj);
        if (targetObj) {
          return targetObj;
        }
      }
    }
  }

  return null;
};
