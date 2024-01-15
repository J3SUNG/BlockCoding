import { BlockPaintProps } from '@/types/blockPaintProps';
import { blockStart } from './blockStart';

interface BlockControllerProps extends BlockPaintProps {
  setBlockInputObj: ({ x, y, value, isView, setBlockValue }: any) => void;
}

export const blockController = ({ x, y, width, height, name, setBlockInputObj }: BlockControllerProps) => {
  if (name === 'start') {
    return blockStart({ x, y, width: 220, height, name });
  }
};
