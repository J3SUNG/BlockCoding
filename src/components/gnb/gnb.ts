import {
  ConsoleLog,
  ProgramState,
  UpdateConsoleLog,
  UpdateProgramState,
  UpdateWorkspaceDataAll,
  WorkspaceData,
} from '../../types/stateType';
import { createElementCommon } from '../../utils/createElementCommon';
import { BlockObject } from '../../types/blockObject';
import { useState } from '../../core/core';
import { BlockCommon } from '../../classes/block/blockClassCommon';
import { createBlock } from '../../classes/blockFactory/createBlock';
import { InfinityLoop } from '../../classes/infinityLoop/infinityLoop';

interface GnbProps {
  getWorkspaceData: () => WorkspaceData;
  updateWorkspaceDataAll: UpdateWorkspaceDataAll;
  getConsoleLog: () => ConsoleLog;
  updateConsoleLog: UpdateConsoleLog;
  render: () => void;
}

export const gnb = ({
  getWorkspaceData,
  updateWorkspaceDataAll,
  getConsoleLog,
  updateConsoleLog,
  render,
}: GnbProps) => {
  const [getProgramState, setProgramState] = useState<ProgramState>('prgramState', 'stop');
  const header = createElementCommon('header', { id: 'gnb' });
  const h1 = createElementCommon('h1', { id: 'title', textContent: 'Block Coding' });
  const nav = createElementCommon('nav', {});
  const saveButton = createElementCommon('button', { type: 'button', className: 'bg-yellow', textContent: 'Save' });
  const loadButton = createElementCommon('button', { type: 'button', className: 'bg-gray', textContent: 'Load' });
  const fileInput = createElementCommon('input', { type: 'file', accept: '.json', style: 'display: none' });
  const playButton = createElementCommon('button', { type: 'button', className: 'bg-green', textContent: '▶' });
  const pauseButton = createElementCommon('button', { type: 'button', className: 'bg-yellow', textContent: '⏸' });
  const stopButton = createElementCommon('button', { type: 'button', className: 'bg-red', textContent: '⏹' });

  const updateProgramState = (state: ProgramState) => {
    setProgramState(state);
    render();

    const event = new CustomEvent('ProgramStateChange', { detail: state });
    document.dispatchEvent(event);
  };

  playButton.addEventListener('click', () => {
    if (getProgramState() === 'stop') {
      runProgram(getWorkspaceData(), getConsoleLog, updateConsoleLog, updateProgramState, getProgramState);
    } else if (getProgramState() === 'pause') {
      updateProgramState('run');
    }
  });

  pauseButton.addEventListener('click', () => {
    if (getProgramState() === 'run') {
      updateProgramState('pause');
    }
  });

  stopButton.addEventListener('click', () => {
    if (getProgramState() !== 'stop') {
      updateProgramState('stop');
    }
  });

  saveButton.addEventListener('click', () => {
    const data = JSON.stringify(getWorkspaceData());
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'workspaceData.json';
    link.click();
    URL.revokeObjectURL(url);
  });

  loadButton.addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', async (e) => {
    if (fileInput instanceof HTMLInputElement) {
      const file = fileInput.files?.[0];

      if (file) {
        const reader: FileReader = new FileReader();

        reader.onload = function (e: ProgressEvent<FileReader>) {
          const content: string = e.target?.result as string;
          const jsonData: WorkspaceData = JSON.parse(content);

          loadData(jsonData, updateWorkspaceData, updateProgramState, updateConsoleLog);

          element.value = '';
        };

        reader.readAsText(file);
      }
    }
  });

  nav.appendChild(saveButton);
  nav.appendChild(loadButton);
  nav.appendChild(fileInput);
  nav.appendChild(playButton);
  nav.appendChild(pauseButton);
  nav.appendChild(stopButton);

  header.appendChild(h1);
  header.appendChild(nav);

  return header;
};

const runProgram = async (
  workspaceData: WorkspaceData,
  getConsoleLog: () => ConsoleLog,
  updateConsoleLog: UpdateConsoleLog,
  updateProgramState: UpdateProgramState,
  getProgramState: () => ProgramState,
) => {
  updateProgramState('run');
  const startBlock = workspaceData.filter((block) => {
    return block.name === 'start' && block.data;
  });

  updateConsoleLog(['[프로그램을 실행합니다.]', 'ㅤ']);

  for (const block of startBlock) {
    const variableMap = new Map<string, string>();

    if (block instanceof BlockCommon) {
      const timeManager = new InfinityLoop();
      await block.runLogic(block, variableMap, getConsoleLog, updateConsoleLog, getProgramState, timeManager);
    }
  }
  updateConsoleLog([...getConsoleLog(), 'ㅤ', '[프로그램이 종료되었습니다.]']);

  updateProgramState('stop');
};

const restoreWorkspaceData = (block: BlockObject | BlockObject[]): BlockCommon | BlockCommon[] => {
  if (Array.isArray(block)) {
    return block.flatMap((item) => {
      const newBlock = restoreWorkspaceData(item);
      return newBlock instanceof BlockCommon ? [newBlock] : [];
    });
  } else {
    const newBlock = createBlock(block.name, block.data.id, block.data.x, block.data.y);
    Object.assign(newBlock, block);

    [...newBlock.getInnerBlock(), ...newBlock.getChildBlock()].forEach((key) => {
      const innerBlock = newBlock.data[key];

      if (typeof innerBlock === 'object' && innerBlock !== null && Object.keys(innerBlock).length > 0) {
        const newChildBlock = restoreWorkspaceData(innerBlock);

        if (newChildBlock) {
          newBlock.data[key] = newChildBlock;
        }
      }
    });

    return newBlock;
  }
};

const loadData = (
  loadWorkspaceData: WorkspaceData,
  updateWorkspaceDataAll: UpdateWorkspaceDataAll,
  updateProgramState: UpdateProgramState,
  updateConsoleLog: UpdateConsoleLog,
): void => {
  const newWorkspaceData = loadWorkspaceData.map((block: BlockObject) => restoreWorkspaceData(block)) as BlockCommon[];

  updateWorkspaceDataAll(newWorkspaceData);
  updateProgramState('stop');
  updateConsoleLog([]);
};
