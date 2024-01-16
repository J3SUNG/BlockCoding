import { BlockPaintProps } from '../../types/blockPaintProps';
import { blockStart } from './blockStart';
import { blockOutput } from './blockOutput';
import { blockValue } from './blockValue';

interface BlockControllerProps extends BlockPaintProps {
  value?: string;
}

export const blockController = ({ x, y, width, height, name, value, id }: BlockControllerProps) => {
  if (name === 'start') {
    return blockStart({ x, y, width: 220, height, name, id });
  } else if (name === 'output') {
    return blockOutput({ x, y, width: 105, height, name, id });
  } else if (name === 'value') {
    return blockValue({ x, y, width, height, name, value, id });
  } else {
    return document.createElementNS('http://www.w3.org/2000/svg', 'g');
  }
};
