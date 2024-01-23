import { WorkspaceData } from '../../types/stateType';
import { createElementCommon } from '../../utils/createElementCommon';
import { BLOCK_OBJECT } from '../../constants/blockObject';
import { onDropAnotherBlock } from '../../utils/onDropAnotherBlock';
import { deepCopyObject } from '../../utils/deepCopyObject';
import { createUniqueId } from '../../utils/createUniqueId';
import { blockController } from '../../utils/blockController';

interface WorkspaceProps {
  workspaceData: WorkspaceData;
  updateWorkspaceData: (workspaceData: WorkspaceData) => void;
}

interface WorkspaceSectionProps {
  workspaceData: WorkspaceData;
  updateWorkspaceData: (workspaceData: WorkspaceData) => void;
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
  updateWorkspaceData: (workspaceData: WorkspaceData) => void;
}

export const workspace = ({ workspaceData, updateWorkspaceData }: WorkspaceProps) => {
  const section = workspaceSection({ workspaceData, updateWorkspaceData });
  const trashBin = createElementCommon('div', { id: 'trash-bin' });
  const trashIcon = createElementCommon('span', { className: 'material-symbols-outlined', textContent: 'delete' });

  section.addEventListener('dragover', function (event) {
    event.preventDefault();
  });

  section.addEventListener('drop', function (event) {
    event.preventDefault();
    if (event.target !== section) {
      // TODO: 다른 블럭들과 이벤트 발생
    } else {
      onDropWorkspace({ section, event, workspaceData, updateWorkspaceData });
    }
  });

  workspaceData.forEach((obj) => {
    paintWorkspace({
      section,
      obj,
      x: obj.data.x,
      y: obj.data.y,
      width: 100,
      height: 50,
      workspaceData,
      updateWorkspaceData,
    });
  });

  return section;
};

const workspaceSection = ({ workspaceData, updateWorkspaceData }: WorkspaceSectionProps) => {
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
      const newWorkspaceData = deepCopyObject({ obj: workspaceData });

      onDropAnotherBlock({ targetUniqueId: uniqueId, name, type, obj: workspaceData });
      updateWorkspaceData([...workspaceData]);
    } else {
      onDropWorkspace({ section, event, workspaceData, updateWorkspaceData });
    }
  });

  workspaceData.forEach((obj) => {
    paintWorkspace({
      section,
      obj,
      x: obj.data.x,
      y: obj.data.y,
      width: 100,
      height: 50,
      workspaceData,
      updateWorkspaceData,
    });
  });

  return section;
};

const onDropWorkspace = ({ section, event, workspaceData, updateWorkspaceData }: OnDropWorkspaceProps) => {
  const name = event.dataTransfer!.getData('name');
  const offsetX = event.dataTransfer?.getData('offsetX');
  const offsetY = event.dataTransfer?.getData('offsetY');
  const rect = section.getBoundingClientRect();
  const x = event.clientX - rect.left - Number(offsetX);
  const y = event.clientY - rect.top - Number(offsetY);
  const deepCopiedObj = deepCopyObject({ obj: BLOCK_OBJECT[name] });

  const uniqueId = createUniqueId();
  deepCopiedObj.data.id = uniqueId;
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
