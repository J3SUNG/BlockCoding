import { BlockList, SeqNo, SetBlockList, SetSeqNo } from '../../types/stateType';
import { blockController } from '../block/blockController';
import { createElementCommon } from '../../utils/createElementCommon';
import { BLOCK_OBJECT } from '../../constants/blockObject';
import { BLOCK_MAP } from '../../constants/blockMap';
import { findTargetBlock } from '../../utils/findTargetBlock';

interface WorkspaceSectionProps {
  blockList: BlockList;
  setBlockList: SetBlockList;
  seqNo: SeqNo;
  setSeqNo: SetSeqNo;
}

interface paintBlockListProps {
  section: any;
  obj: any;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface dropWorkspaceProps {
  section: any;
  event: DragEvent;
  blockList: BlockList;
  setBlockList: SetBlockList;
  seqNo: SeqNo;
  setSeqNo: SetSeqNo;
}

export const workspaceSection = ({ blockList, setBlockList, seqNo, setSeqNo }: WorkspaceSectionProps) => {
  const x = 50;
  const y = 50;
  const width = 100;
  const height = 50;

  const section = createElementCommon('section', { id: 'workspace' });

  section.addEventListener('dragover', function (event) {
    event.preventDefault();
  });

  section.addEventListener('drop', function (event) {
    event.preventDefault();
    console.log(blockList);
    if (event.target !== section) {
      const target = event.target as Element;
      const uniqueId = target.closest('div')?.id ?? '';
      const name = event.dataTransfer!.getData('name');
      const type = event.dataTransfer!.getData('type');

      findTargetBlock({ targetUniqueId: uniqueId, name, type, obj: blockList, seqNo, setSeqNo });
      // TODO: uniqueId 넣어줘야함.
      setBlockList([...blockList]);
    } else {
      dropWorkspace({ section, event, blockList, setBlockList, seqNo, setSeqNo });
    }
  });

  paintBlockList({ section, obj: blockList, x, y, width, height });

  return section;
};

const dropWorkspace = ({ section, event, blockList, setBlockList, seqNo, setSeqNo }: dropWorkspaceProps) => {
  const name = event.dataTransfer!.getData('name');
  const offsetX = event.dataTransfer?.getData('offsetX');
  const offsetY = event.dataTransfer?.getData('offsetY');
  const rect = section.getBoundingClientRect();
  const x = event.clientX - rect.left - Number(offsetX);
  const y = event.clientY - rect.top - Number(offsetY);
  const deepCopiedObj = JSON.parse(JSON.stringify(BLOCK_OBJECT[BLOCK_MAP[name]]));

  deepCopiedObj.data.id = `unique-id__${seqNo}`;
  setSeqNo(seqNo + 1);
  deepCopiedObj.data.x = x;
  deepCopiedObj.data.y = y;

  setBlockList([...blockList, { ...deepCopiedObj }]);
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
