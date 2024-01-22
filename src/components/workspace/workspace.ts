import { WorkspaceData, SeqNo, IncreaseSeqNo } from '../../types/stateType';
import { createElementCommon } from '../../utils/createElementCommon';
import { BLOCK_OBJECT } from '../../constants/blockObject';
import { onDropAnotherBlock } from '../../utils/onDropAnotherBlock';
import { blockStart } from '../../components/block/blockStart';
import { BlockCommonProps } from '../../types/blockCommonProps';
import { blockOutput } from '../../components/block/blockOutput';
import { blockValue } from '../../components/block/blockValue';
import { deepCopyObject } from '../../utils/deepCopyObject';

interface WorkspaceProps {
  workspaceData: WorkspaceData;
  seqNo: SeqNo;
  updateWorkspaceData: (workspaceData: WorkspaceData) => void;
  increaseSeqNo: IncreaseSeqNo;
}

interface WorkspaceSectionProps {
  workspaceData: WorkspaceData;
  seqNo: SeqNo;
  updateWorkspaceData: (workspaceData: WorkspaceData) => void;
  increaseSeqNo: IncreaseSeqNo;
}

interface PaintWorkspaceProps {
  section: any;
  obj: any;
  x: number;
  y: number;
  width: number;
  height: number;
  workspaceData: WorkspaceData;
  updateWorkspaceData: (workspaceData: WorkspaceData) => void;
}

interface OnDropWorkspaceProps {
  section: any;
  event: DragEvent;
  workspaceData: WorkspaceData;
  seqNo: SeqNo;
  updateWorkspaceData: (workspaceData: WorkspaceData) => void;
  increaseSeqNo: IncreaseSeqNo;
}

export const workspace = ({ workspaceData, seqNo, updateWorkspaceData, increaseSeqNo }: WorkspaceProps) => {
  const section = workspaceSection({ workspaceData, seqNo, updateWorkspaceData, increaseSeqNo });
  const trashBin = createElementCommon('div', { id: 'trash-bin' });
  const trashIcon = createElementCommon('span', { className: 'material-symbols-outlined', textContent: 'delete' });

  trashBin.appendChild(trashIcon);
  section.appendChild(trashBin);

  return section;
};

const workspaceSection = ({ workspaceData, seqNo, updateWorkspaceData, increaseSeqNo }: WorkspaceSectionProps) => {
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

      onDropAnotherBlock({ targetUniqueId: uniqueId, name, type, obj: workspaceData, seqNo, increaseSeqNo });
      updateWorkspaceData([...workspaceData]);
    } else {
      onDropWorkspace({ section, event, workspaceData, updateWorkspaceData, seqNo, increaseSeqNo });
    }
  });

  workspaceData.forEach((obj) => {
    paintWorkspace({ section, obj, x: obj.data.x, y: obj.data.y, width, height, workspaceData, updateWorkspaceData });
  });

  return section;
};

const onDropWorkspace = ({
  section,
  event,
  workspaceData,
  seqNo,
  updateWorkspaceData,
  increaseSeqNo,
}: OnDropWorkspaceProps) => {
  const name = event.dataTransfer!.getData('name');
  const offsetX = event.dataTransfer?.getData('offsetX');
  const offsetY = event.dataTransfer?.getData('offsetY');
  const rect = section.getBoundingClientRect();
  const x = event.clientX - rect.left - Number(offsetX);
  const y = event.clientY - rect.top - Number(offsetY);
  const deepCopiedObj = deepCopyObject({ obj: BLOCK_OBJECT[name] });

  deepCopiedObj.data.id = `unique-id__${seqNo}`;
  increaseSeqNo();
  deepCopiedObj.data.x = x;
  deepCopiedObj.data.y = y;

  updateWorkspaceData([...workspaceData, { ...deepCopiedObj }]);
};

const paintWorkspace = ({
  section,
  obj,
  x,
  y,
  width,
  height,
  workspaceData,
  updateWorkspaceData,
}: PaintWorkspaceProps) => {
  if (!obj) {
    return;
  }

  if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      paintWorkspace({
        section,
        obj: item,
        x,
        y: y + height * index,
        width,
        height,
        workspaceData,
        updateWorkspaceData,
      });
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
        workspaceData,
        updateWorkspaceData,
      });
      section.appendChild(div);

      paintWorkspace({
        section,
        obj: obj.data.value,
        x: x,
        y: y + addY,
        width,
        height,
        workspaceData,
        updateWorkspaceData,
      });
    }
  }
};

const blockController = ({ id, x, y, type, name, value, workspaceData, updateWorkspaceData }: BlockCommonProps) => {
  switch (name) {
    case 'start':
      return blockStart({ id, x, y, type, name, value });
    case 'output':
      return blockOutput({ id, x, y, type, name, value });
    case 'value':
      return blockValue({ id, x, y, type, name, value, workspaceData, updateWorkspaceData });
    default:
      throw new Error('blockController: 구현 되지 않은 블럭입니다.');
  }
};
