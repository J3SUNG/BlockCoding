import { ConsoleLog, ProgramState, UpdateConsoleLog, UpdateProgramState, WorkspaceData } from '../../types/stateType';
import { createElementCommon } from '../../utils/createElementCommon';
import { BlockObject } from '../../types/blockObject';
import { useState } from '../../core/core';

interface GnbProps {
  getWorkspaceData: () => WorkspaceData;
  getConsoleLog: () => ConsoleLog;
  updateConsoleLog: UpdateConsoleLog;
  render: () => void;
}

export const gnb = ({ getWorkspaceData, getConsoleLog, updateConsoleLog, render }: GnbProps) => {
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
    runProgram(getWorkspaceData(), getConsoleLog, updateConsoleLog, updateProgramState);
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
  getConsoleLog: () => ConsoleLog,
  updateConsoleLog: UpdateConsoleLog,
  updateProgramState: UpdateProgramState,
) => {
  updateProgramState('run');
  const startBlock = workspaceData.filter((block) => {
    return block.name === 'start' && block.data;
  });

  updateConsoleLog(['[프로그램을 실행합니다.]', 'ㅤ']);
  for (const block of startBlock) {
    const map = new Map<string, string>();
    await updateLogData(block.data.value as BlockObject, map, getConsoleLog, updateConsoleLog);
  }
  updateConsoleLog([...getConsoleLog(), 'ㅤ', '[프로그램이 종료되었습니다.]']);

  updateProgramState('stop');
};

const updateLogData = async (
  obj: BlockObject,
  map: Map<string, string>,
  prevLog: () => string[],
  setChanageLog: (log: string[]) => void,
): Promise<string[]> => {
  if (Array.isArray(obj)) {
    const results: string[] = [];
    for (const item of obj) {
      const result = await updateLogData(item, map, prevLog, setChanageLog);
      results.push(...result);
    }
    return results;
  } else if (obj.name === 'start') {
    return [];
  } else if (obj.name === 'variable') {
    const varName = (await updateLogData(obj.data.varName as BlockObject, map, prevLog, setChanageLog))[0];
    const varValue = (await updateLogData(obj.data.value as BlockObject, map, prevLog, setChanageLog))[0];
    map.set(varName, varValue);
    return [];
  } else if (obj.name === 'output') {
    const outputData = await updateLogData(obj.data.value as BlockObject, map, prevLog, setChanageLog);
    setChanageLog([...prevLog(), ...outputData]);
    return outputData;
  } else if (obj.name === 'value') {
    return [obj.data.value as string];
  } else if (obj.name === 'refVariable') {
    const varName: string = (await updateLogData(obj.data.value as BlockObject, map, prevLog, setChanageLog))[0];
    const varValue = map.get(varName);
    return varValue ? [varValue] : [];
  } else if (obj.name === 'arithmetic') {
    const operand1 = await updateLogData(obj.data.value as BlockObject, map, prevLog, setChanageLog);
    const operand2 = await updateLogData(obj.data.secondValue as BlockObject, map, prevLog, setChanageLog);
    return [(await obj.runBlockLogic(operand1[0], operand2[0])) as string];
  } else if (obj.name === 'condition') {
    const condition = await updateLogData(obj.data.condition as BlockObject, map, prevLog, setChanageLog);
    if (condition[0] === 'true') {
      return await updateLogData(obj.data.value as BlockObject, map, prevLog, setChanageLog);
    } else {
      return [];
    }
  } else if (obj.name === 'loop') {
    let result: string[] = [];
    let count = 0;
    let condition = await updateLogData(obj.data.condition as BlockObject, map, prevLog, setChanageLog);

    while (condition[0] === 'true' && count < 20) {
      const resultArray = await updateLogData(obj.data.value as BlockObject, map, prevLog, setChanageLog);
      result = result.concat(resultArray);
      count++;
      condition = await updateLogData(obj.data.condition as BlockObject, map, prevLog, setChanageLog);
    }
    return result;
  } else if (obj.name === 'comparison' || obj.name === 'logical') {
    const operand1 = await updateLogData(obj.data.value as BlockObject, map, prevLog, setChanageLog);
    const operand2 = await updateLogData(obj.data.secondValue as BlockObject, map, prevLog, setChanageLog);
    return [obj.runBlockLogic(operand1[0], operand2[0]) + ''];
  } else if (obj.name === 'negation') {
    const operand = await updateLogData(obj.data.value as BlockObject, map, prevLog, setChanageLog);
    return [obj.runBlockLogic(operand[0]) + ''];
  } else if (obj.name === 'timer') {
    const time = await updateLogData(obj.data.value as BlockObject, map, prevLog, setChanageLog);
    await new Promise((resolve) => setTimeout(resolve, Number(time[0]) * 1000));
    return [];
  } else if (obj.name === 'input') {
    setChanageLog([...prevLog(), '[입력 해주세요.]']);
    const input = document.querySelector('#console__input') as HTMLInputElement;

    const waitInput = () => {
      return new Promise<string>((resolve) => {
        const onKeyDown = (e: KeyboardEvent) => {
          if (e.key === 'Enter') {
            input.removeEventListener('keydown', onKeyDown);
            const inputValue = input.value;
            input.value = '';
            setChanageLog([...prevLog(), inputValue]);
            resolve(inputValue);
          }
        };

        input.addEventListener('keydown', onKeyDown);
      });
    };

    const userInput = await waitInput();
    return [userInput];
  }

  return [];
};
