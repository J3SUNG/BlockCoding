import { ConsoleLog, ProgramState, UpdateConsoleLog, UpdateProgramState, WorkspaceData } from '../../types/stateType';
import { createElementCommon } from '../../utils/createElementCommon';
import { BlockObject } from '../../types/blockObject';

interface GnbProps {
  workspaceData: WorkspaceData;
  updateProgramStateRun: UpdateProgramState;
  updateProgramStateStop: UpdateProgramState;
  updateProgramStatePause: UpdateProgramState;
  updateConsoleLog: UpdateConsoleLog;
}

export const gnb = ({
  workspaceData,
  updateProgramStateRun,
  updateProgramStateStop,
  updateProgramStatePause,
  updateConsoleLog,
}: GnbProps) => {
  const header = createElementCommon('header', { id: 'gnb' });
  const h1 = createElementCommon('h1', { id: 'title', textContent: 'Block Coding' });
  const nav = createElementCommon('nav', {});
  const saveButton = createElementCommon('button', { type: 'button', className: 'bg-yellow', textContent: 'Save' });
  const loadButton = createElementCommon('button', { type: 'button', className: 'bg-gray', textContent: 'Load' });
  const playButton = createElementCommon('button', { type: 'button', className: 'bg-green', textContent: '▶' });
  const stopButton = createElementCommon('button', { type: 'button', className: 'bg-red', textContent: '⏹' });

  playButton.addEventListener('mousedown', () => {
    runProgram(workspaceData, updateConsoleLog, updateProgramStateRun, updateProgramStateStop);
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
  updateProgramStateRun: UpdateProgramState,
  updateProgramStateStop: UpdateProgramState,
) => {
  updateProgramStateRun();
  const startBlock = workspaceData.filter((block) => {
    return block.name === 'start' && block.data;
  });
  const logList: string[] = [];

  startBlock.forEach((block) => {
    const log = getLogData(block.data.value as BlockObject);
    logList.push(...log);
  });

  updateConsoleLog(logList);
  updateProgramStateStop;
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
