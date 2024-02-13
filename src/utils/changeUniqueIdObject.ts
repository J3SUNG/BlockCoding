import { BlockObjectValue } from '../types/blockObject';
import { createUniqueId } from './createUniqueId';

export const changeUniqueIdObject = (obj: BlockObjectValue): void => {
  if (!obj) {
    return;
  }

  if (Array.isArray(obj)) {
    for (const item of obj) {
      changeUniqueIdObject(item);
    }
  } else if (typeof obj === 'object' && 'data' in obj && (obj.data.value || obj.data.value == '')) {
    const blockProps = [...obj.getInnerBlock(), ...obj.getChildBlock()];
    const newUniqueId = createUniqueId();
    obj.data.id = newUniqueId;

    for (const item of blockProps) {
      const blockObj = obj.data[item];

      if (typeof blockObj === 'object') {
        changeUniqueIdObject(blockObj);
      }
    }
  }
};
