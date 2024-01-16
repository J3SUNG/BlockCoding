import { BlockPaintProps } from '../../types/blockPaintProps';
import { blockStart } from './blockStart';
import { blockOutput } from './blockOutput';
import { blockValue } from './blockValue';

interface BlockControllerProps extends BlockPaintProps {
  setBlockInputObj: ({ x, y, value, isView, setBlockValue }: any) => void;
}

export const blockController = ({ x, y, width, height, name, setBlockInputObj }: BlockControllerProps) => {
  if (name === 'start') {
    return blockStart({ x, y, width: 220, height, name });
  } else if (name === 'output') {
    return blockOutput({ x, y, width: 105, height, name });
  } else if (name === 'value') {
    return blockValue({ x, y, width, height, name, setBlockInputObj });
  } else {
    return document.createAttributeNS('http://www.w3.org/2000/svg', 'g');
  }
};
