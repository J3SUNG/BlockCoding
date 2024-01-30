import { ProgramState, UpdateConsoleLog, UpdateProgramState, WorkspaceData } from '../../types/stateType';
import { createElementCommon } from '../../utils/createElementCommon';
import { BlockObject } from '../../types/blockObject';
import { useState } from '../../core/core';

interface GnbProps {
  getWorkspaceData: () => WorkspaceData;
  updateConsoleLog: UpdateConsoleLog;
  render: () => void;
}

export const gnb = ({ getWorkspaceData, updateConsoleLog, render }: GnbProps) => {
  const [getProgramState, setProgramState] = useState<ProgramState>('prgramState', 'stop');
  const header = createElementCommon('header', { id: 'gnb' });
  const h1 = createElementCommon('h1', { id: 'title', textContent: 'Block Coding' });
  const nav = createElementCommon('nav', {});
  const saveButton = createElementCommon('button', { type: 'button', className: 'bg-yellow', textContent: 'Save' });
  const loadButton = createElementCommon('button', { type: 'button', className: 'bg-gray', textContent: 'Load' });
  const playButton = createElementCommon('button', { type: 'button', className: 'bg-green', textContent: '▶' });
  const stopButton = createElementCommon('button', { type: 'button', className: 'bg-red', textContent: '⏹' });

  const updateProgramState = (state: ProgramState) => {
    setProgramState(state);
    render();
  };

  playButton.addEventListener('click', () => {
    runProgram(getWorkspaceData(), updateConsoleLog, updateProgramState);
  });

  nav.appendChild(saveButton);
  nav.appendChild(loadButton);
  nav.appendChild(playButton);
  nav.appendChild(stopButton);

  header.appendChild(h1);
  header.appendChild(nav);

  return header;
};

const runProgram = (
  workspaceData: WorkspaceData,
  updateConsoleLog: UpdateConsoleLog,
  updateProgramState: UpdateProgramState,
) => {
  updateProgramState('run');
  const startBlock = workspaceData.filter((block) => {
    return block.name === 'start' && block.data;
  });
  const logList: string[] = [];

  startBlock.forEach((block) => {
    const log = getLogData(block.data.value as BlockObject);
    logList.push(...log);
  });

  updateConsoleLog(logList);
  updateProgramState('stop');
};

const getLogData = (obj: BlockObject): string[] => {
  if (Array.isArray(obj)) {
    return obj.reduce((acc, item) => acc.concat(getLogData(item)), []);
  } else if (obj.name === 'start') {
    return [];
  } else if (obj.name === 'output') {
    return getLogData(obj.data.value as BlockObject);
  } else if (obj.name === 'value') {
    return [obj.data.value as string];
  } else {
    return [];
  }
};
