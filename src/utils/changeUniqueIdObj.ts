import { BlockObjectValue } from '../types/blockObject';
import { createUniqueId } from './createUniqueId';

export const changeUniqueIdObj = (obj: BlockObjectValue): void => {
  if (!obj) {
    return;
  }

  if (Array.isArray(obj)) {
    for (const item of obj) {
      changeUniqueIdObj(item);
    }
  } else if (typeof obj === 'object' && 'data' in obj) {
    const blockProps = [...obj.getInnerBlock(), ...obj.getChildBlock()];
    const newUniqueId = createUniqueId();
    obj.data.id = newUniqueId;

    for (const item of blockProps) {
      const blockObj = obj.data[item];

      if (typeof blockObj === 'object') {
        changeUniqueIdObj(blockObj);
      }
    }
  }
};
