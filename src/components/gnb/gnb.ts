import { ConsoleLog, ProgramState, BlockList, SetConsoleLog, SetProgramState } from '../../types/stateType';
import { createElementCommon } from '../../utils/createElementCommon';
import { BlockObject } from '../../types/blockObject';

interface GnbProps {
  programState: ProgramState;
  setProgramState: SetProgramState;
  consoleLog: ConsoleLog;
  setConsoleLog: SetConsoleLog;
  blockList: BlockList;
}

export const gnb = ({ programState, setProgramState, consoleLog, setConsoleLog, blockList }: GnbProps) => {
  const header = createElementCommon('header', { id: 'gnb' });
  const h1 = createElementCommon('h1', { id: 'title', textContent: 'Block Coding' });
  const nav = createElementCommon('nav', {});
  const saveButton = createElementCommon('button', { type: 'button', className: 'bg-yellow', textContent: 'Save' });
  const loadButton = createElementCommon('button', { type: 'button', className: 'bg-gray', textContent: 'Load' });
  const playButton = createElementCommon('button', { type: 'button', className: 'bg-green', textContent: '▶' });
  const stopButton = createElementCommon('button', { type: 'button', className: 'bg-red', textContent: '⏹' });

  playButton.addEventListener('mousedown', () => {
    setTimeout(() => {
      runProgram({ blockList, setConsoleLog, setProgramState });
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

interface RunProgramProps {
  blockList: BlockList;
  setConsoleLog: SetConsoleLog;
  setProgramState: SetProgramState;
}

export const runProgram = ({ blockList, setConsoleLog, setProgramState }: RunProgramProps) => {
  setProgramState('run');
  const startBlock = blockList.filter((block) => {
    return block.name === 'start' && block.data;
  });
  const log: string[] = [];

  startBlock.forEach((block) => {
    objParser({ obj: block.data.value, log });
  });

  setConsoleLog(log);
  setProgramState('stop');
};

const objParser = ({ obj, log }: any) => {
  if (Array.isArray(obj)) {
    obj.forEach((item: BlockObject) => {
      objParser({ obj: item, log });
    });
  }
  if (obj.name === 'start') {
    // TODO: 예외처리 추가 필요
    return null;
  } else if (obj.name === 'output') {
    const value = obj.data.value as BlockObject;
    const returnValue = objParser({ obj: value, log });
    log.push(returnValue);
  } else if (obj.name === 'value') {
    return obj.data.value;
  } else {
    return null;
  }
};
