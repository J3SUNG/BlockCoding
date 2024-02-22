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
  } else if (typeof obj === 'object' && 'data' in obj) {
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

export const findTargetParentBlock = (
  targetId: string,
  obj: BlockObjectValue,
  parent: BlockObject | BlockObject[],
): { parent: BlockObject | BlockObject[]; prop?: string; index?: number } | null => {
  if (!obj) {
    return null;
  }

  if (Array.isArray(obj)) {
    for (let index = 0; index < obj.length; ++index) {
      const item = obj[index];
      const result = findTargetParentBlock(targetId, item, obj);
      if (result) {
        if (result.index || result.prop || result.index === 0) {
          return result;
        } else {
          return { parent: obj, index };
        }
      }
    }
  } else if (typeof obj === 'object' && 'data' in obj) {
    if (obj.data.id === targetId) {
      return { parent };
    }

    const blockProps = [...obj.getInnerBlock(), ...obj.getChildBlock()];
    for (const prop of blockProps) {
      if (prop in obj.data) {
        const blockObj = obj.data[prop];
        if (typeof blockObj === 'object') {
          const result = findTargetParentBlock(targetId, blockObj, obj);
          if (result) {
            if (result.index || result.prop || result.index === 0) {
              return result;
            } else {
              return { parent: obj, prop };
            }
          }
        }
      }
    }
  }

  return null;
};
