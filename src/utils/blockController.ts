import { blockOutput } from '../components/block/blockOutput';
import { blockStart } from '../components/block/blockStart';
import { blockValue } from '../components/block/blockValue';
import { BlockCommonProps } from '../types/blockCommonProps';

export const blockController = ({ id, x, y, type, name, value, updateWorkspaceDataValue }: BlockCommonProps) => {
  switch (name) {
    case 'start':
      return blockStart({ id, x, y, type, name, value });
    case 'output':
      return blockOutput({ id, x, y, type, name, value });
    case 'value':
      return blockValue({ id, x, y, type, name, value, updateWorkspaceDataValue });
    default:
      return blockStart({ id, x, y, type, name, value });
  }
};
