import { BlockObject } from '../types/blockObject';

export const deepCopyObject = ({ obj }: { obj: BlockObject }) => {
  return JSON.parse(JSON.stringify(obj));
};
