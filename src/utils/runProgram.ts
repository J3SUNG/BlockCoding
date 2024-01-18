import { BlockObject } from '../types/blockObject';
import { BlockList, SetConsoleLog, SetProgramState } from '../types/stateType';

interface RunProgramProps {
  blockList: BlockList;
  setConsoleLog: SetConsoleLog;
  setProgramState: SetProgramState;
}

export const runProgram = ({ blockList, setConsoleLog, setProgramState }: RunProgramProps) => {
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
