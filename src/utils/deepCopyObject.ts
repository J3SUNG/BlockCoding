import { BlockObject } from '../types/blockObject';

export const deepCopyObject = (obj: BlockObject | BlockObject[]) => {
  return JSON.parse(JSON.stringify(obj));
};
