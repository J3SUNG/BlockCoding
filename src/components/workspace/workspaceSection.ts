import { BlockList, SeqNo, SetBlockList, SetSeqNo } from '../../types/stateType';
import { createElementCommon } from '../../utils/createElementCommon';
import { BLOCK_OBJECT } from '../../constants/blockObject';
import { BLOCK_MAP } from '../../constants/blockMap';
import { findTargetBlock } from '../../utils/findTargetBlock';
import { blockStart } from '../../components/block/blockStart';
import { BlockCommonProps } from '../../types/blockCommonProps';
import { blockOutput } from '../../components/block/blockOutput';
import { blockValue } from '../../components/block/blockValue';

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
  blockList: BlockList;
  setBlockList: SetBlockList;
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
    if (event.target !== section) {
      const target = event.target as Element;
      const uniqueId = target.closest('div')?.id ?? '';
      const name = event.dataTransfer!.getData('name');
      const type = event.dataTransfer!.getData('type');

      findTargetBlock({ targetUniqueId: uniqueId, name, type, obj: blockList, seqNo, setSeqNo });
      setBlockList([...blockList]);
    } else {
      dropWorkspace({ section, event, blockList, setBlockList, seqNo, setSeqNo });
    }
  });

  blockList.forEach((obj) => {
    paintBlockList({ section, obj, x: obj.data.x, y: obj.data.y, width, height, blockList, setBlockList });
  });

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

const paintBlockList = ({ section, obj, x, y, width, height, blockList, setBlockList }: paintBlockListProps) => {
  if (!obj) {
    return;
  }

  if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      paintBlockList({ section, obj: item, x, y: y + height * index, width, height, blockList, setBlockList });
    });
  } else {
    if (obj.data && (obj.data.value || obj.data.value == '')) {
      let addX = 0;
      let addY = 0;
      if (obj.type === 'general' || obj.type === 'control') {
        addY = height;
      } else if (obj.type === 'expressionValue' || obj.type === 'expressionLogical') {
        addX = 60;
        addY = 5;
      }
      const div = blockController({
        x: x + addX,
        y: y + addY,
        name: obj.name,
        value: obj.data.value.toString(),
        id: obj.data.id,
        type: obj.type,
        blockList,
        setBlockList,
      });
      section.appendChild(div);

      paintBlockList({
        section,
        obj: obj.data.value,
        x: x,
        y: y + addY,
        width,
        height,
        blockList,
        setBlockList,
      });
    }
  }
};

const blockController = ({ id, x, y, type, name, value, blockList, setBlockList }: BlockCommonProps) => {
  switch (name) {
    case 'start':
      return blockStart({ id, x, y, type, name, value });
    case 'output':
      return blockOutput({ id, x, y, type, name, value });
    case 'value':
      return blockValue({ id, x, y, type, name, value, blockList, setBlockList });
    default:
      throw new Error('blockController: 구현 되지 않은 블럭입니다.');
  }
};
