import { BlockList, SetBlockList } from '../../types/stateType';
import { blockController } from '../block/blockController';
import { createElementCommon } from '../../utils/createElementCommon';
import { BLOCK_OBJECT } from '../../constants/blockObject';
import { BLOCK_MAP } from '../../constants/blockMap';

interface WorkspaceSectionProps {
  blockList: BlockList;
  setBlockList: SetBlockList;
}

interface paintBlockListProps {
  section: any;
  obj: any;
  x: number;
  y: number;
  width: number;
  height: number;
}

export const workspaceSection = ({ blockList, setBlockList }: WorkspaceSectionProps) => {
  const x = 50;
  const y = 50;
  const width = 100;
  const height = 50;

  const section = createElementCommon('section', { id: 'workspace' });

  //
  section.addEventListener('dragover', function (event) {
    event.preventDefault();
  });

  section.addEventListener('drop', function (event) {
    event.preventDefault();
    const name = event.dataTransfer!.getData('name');
    const newBlockList: BlockList = [...blockList, BLOCK_OBJECT[BLOCK_MAP[name]]];

    setBlockList(newBlockList);
  });

  paintBlockList({ section, obj: blockList, x, y, width, height });
  return section;
};

const paintBlockList = ({ section, obj, x, y, width, height }: paintBlockListProps) => {
  if (!obj) return;

  if (Array.isArray(obj)) {
    let originalY = y;
    for (const item of obj) {
      paintBlockList({ section, obj: item, x, y, width, height });
      y += height;
    }
    y = originalY;
  } else {
    if (obj.data && obj.data.value) {
      const g = blockController({
        x: obj.data.x,
        y: obj.data.y,
        name: obj.name,
        value: obj.data.value.toString(),
        id: obj.data.id,
        type: obj.type,
      });
      section.appendChild(g);

      paintBlockList({ section, obj: obj.data.value, x, y, width, height });
    }
  }
};
