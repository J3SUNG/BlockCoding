import { ConsoleLog, ProgramState, UpdateConsoleLog, UpdateProgramState, WorkspaceData } from '../../types/stateType';
import { createElementCommon } from '../../utils/createElementCommon';
import { BlockObject } from '../../types/blockObject';

interface GnbProps {
  programState: ProgramState;
  consoleLog: ConsoleLog;
  workspaceData: WorkspaceData;
  updateProgramStateRun: UpdateProgramState;
  updateProgramStateStop: UpdateProgramState;
  updateProgramStatePause: UpdateProgramState;
  updateConsoleLog: UpdateConsoleLog;
}

interface RunProgramProps {
  workspaceData: WorkspaceData;
  updateConsoleLog: UpdateConsoleLog;
  updateProgramStateRun: UpdateProgramState;
  updateProgramStateStop: UpdateProgramState;
}

export const gnb = ({
  programState,
  consoleLog,
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
    setTimeout(() => {
      runProgram({ workspaceData, updateConsoleLog, updateProgramStateRun, updateProgramStateStop });
    });
  });

  nav.appendChild(saveButton);
  nav.appendChild(loadButton);
  nav.appendChild(playButton);
  nav.appendChild(stopButton);

  header.appendChild(h1);
  header.appendChild(nav);

  return header;
};

const runProgram = ({
  workspaceData,
  updateConsoleLog,
  updateProgramStateRun,
  updateProgramStateStop,
}: RunProgramProps) => {
  updateProgramStateRun;
  const startBlock = workspaceData.filter((block) => {
    return block.name === 'start' && block.data;
  });
  const log: string[] = [];

  startBlock.forEach((block) => {
    updateLogData({ obj: block.data.value, log });
  });

  updateConsoleLog(log);
  updateProgramStateStop;
};

const updateLogData = ({ obj, log }: any) => {
  if (Array.isArray(obj)) {
    obj.forEach((item: BlockObject) => {
      updateLogData({ obj: item, log });
    });
  }
  if (obj.name === 'start') {
    // TODO: 예외처리 추가 필요
    return null;
  } else if (obj.name === 'output') {
    const value = obj.data.value as BlockObject;
    const returnValue = updateLogData({ obj: value, log });
    log.push(returnValue);
  } else if (obj.name === 'value') {
    return obj.data.value;
  } else {
    return null;
  }
};
