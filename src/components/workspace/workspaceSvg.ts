import { BlockList, SetBlockList } from '../../types/stateType';
import { blockController } from '../block/blockController';
import { BlockInputObj } from '../../types/blockInputObj';
import { test } from '../../utils/test';
// import { makeDraggable } from '../../utils/makeDraggable';

interface WorkspaceSvgProps {
  blockList: BlockList;
  setBlockList: SetBlockList;
  setBlockInputObj: ({ x, y, value, isView, setBlockValue }: BlockInputObj) => void;
}

interface objParserProps {
  svg: any;
  obj: any;
  x: number;
  y: number;
  width: number;
  height: number;
}

export const workspaceSvg = ({ blockList, setBlockList, setBlockInputObj }: WorkspaceSvgProps) => {
  const x = 50;
  const y = 50;
  const width = 100;
  const height = 50;

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');

  objParser({ svg, obj: test, x, y, width, height });
  return svg;
};

const objParser = ({ svg, obj, x, y, width, height }: objParserProps) => {
  if (!obj) return;

  if (Array.isArray(obj)) {
    let originalY = y;
    for (const item of obj) {
      objParser({ svg, obj: item, x, y, width, height });
      y += height;
    }
    y = originalY;
  } else {
    if (obj.data && obj.data.value) {
      const g = blockController({
        x: obj.data.x,
        y: obj.data.y,
        width,
        height,
        name: obj.name,
        value: obj.data.value.toString(),
        id: obj.data.id,
      });
      svg.appendChild(g);

      objParser({ svg, obj: obj.data.value, x, y, width, height });
    }
  }
};
