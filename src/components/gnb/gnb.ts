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

const runProgram = async (
  workspaceData: WorkspaceData,
  updateConsoleLog: UpdateConsoleLog,
  updateProgramState: UpdateProgramState,
) => {
  updateProgramState('run');
  const startBlock = workspaceData.filter((block) => {
    return block.name === 'start' && block.data;
  });
  const logList: string[] = [];

  for (const block of startBlock) {
    const map = new Map<string, string>();
    const log = await getLogData(block.data.value as BlockObject, map);
    logList.push(...log);
  }

  updateConsoleLog(logList);
  updateProgramState('stop');
};

const getLogData = async (obj: BlockObject, map: Map<string, string>): Promise<string[]> => {
  if (Array.isArray(obj)) {
    const results = await Promise.all(obj.map((item) => getLogData(item, map)));
    return results.flat();
  } else if (obj.name === 'start') {
    return [];
  } else if (obj.name === 'variable') {
    const varName = (await getLogData(obj.data.varName as BlockObject, map))[0];
    const varValue = (await getLogData(obj.data.value as BlockObject, map))[0];
    map.set(varName, varValue);
    return [];
  } else if (obj.name === 'output') {
    return await getLogData(obj.data.value as BlockObject, map);
  } else if (obj.name === 'value') {
    return [obj.data.value as string];
  } else if (obj.name === 'refVariable') {
    const varName: string = (await getLogData(obj.data.value as BlockObject, map))[0];
    const varValue = map.get(varName);
    return varValue ? [varValue] : [];
  } else if (obj.name === 'arithmetic') {
    const operand1 = await getLogData(obj.data.value as BlockObject, map);
    const operand2 = await getLogData(obj.data.secondValue as BlockObject, map);
    return [(await obj.runLogic(operand1[0], operand2[0])) as string];
  } else if (obj.name === 'condition') {
    const condition = await getLogData(obj.data.condition as BlockObject, map);
    if (condition[0] === 'true') {
      return await getLogData(obj.data.value as BlockObject, map);
    } else {
      return [];
    }
  } else if (obj.name === 'loop') {
    let result: string[] = [];
    let count = 0;
    let condition = await getLogData(obj.data.condition as BlockObject, map);

    while (condition[0] === 'true' && count < 20) {
      const resultArray = await getLogData(obj.data.value as BlockObject, map);
      result = result.concat(resultArray);
      count++;
      condition = await getLogData(obj.data.condition as BlockObject, map);
    }
    return result;
  } else if (obj.name === 'comparison' || obj.name === 'logical') {
    const operand1 = await getLogData(obj.data.value as BlockObject, map);
    const operand2 = await getLogData(obj.data.secondValue as BlockObject, map);
    return [obj.runLogic(operand1[0], operand2[0]) + ''];
  } else if (obj.name === 'negation') {
    const operand = await getLogData(obj.data.value as BlockObject, map);
    return [obj.runLogic(operand[0]) + ''];
  } else if (obj.name === 'timer') {
    const time = await getLogData(obj.data.value as BlockObject, map);
    await new Promise((resolve) => setTimeout(resolve, Number(time[0]) * 1000));
    return [];
  }

  return [];
};
