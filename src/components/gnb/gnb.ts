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
import { createBlock } from '../../classes/factory/createBlock';

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
  const stopButton = createElementCommon('button', { type: 'button', className: 'bg-red', textContent: '⏹' });

  const updateProgramState = (state: ProgramState) => {
    setProgramState(state);
    render();
  };

  playButton.addEventListener('click', () => {
    runProgram(getWorkspaceData(), getConsoleLog, updateConsoleLog, updateProgramState);
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

  fileInput.addEventListener('change', function (e) {
    if (fileInput instanceof HTMLInputElement) {
      const file: File | undefined = fileInput.files?.[0];

      if (file) {
        const reader: FileReader = new FileReader();

        reader.onload = function (e: ProgressEvent<FileReader>) {
          const content: string = e.target?.result as string;
          const jsonData: WorkspaceData = JSON.parse(content);

          loadData(jsonData, updateWorkspaceDataAll);

          fileInput.value = '';
        };

        reader.readAsText(file);
      }
    }
  });

  nav.appendChild(saveButton);
  nav.appendChild(loadButton);
  nav.appendChild(fileInput);
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
    return [(await obj.runLogic(operand1[0], operand2[0])) as string];
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

    while (condition[0] === 'true' && count < 123) {
      const resultArray = await updateLogData(obj.data.value as BlockObject, map, prevLog, setChanageLog);
      result = result.concat(resultArray);
      count++;
      condition = await updateLogData(obj.data.condition as BlockObject, map, prevLog, setChanageLog);
    }
    return result;
  } else if (obj.name === 'comparison' || obj.name === 'logical') {
    const operand1 = await updateLogData(obj.data.value as BlockObject, map, prevLog, setChanageLog);
    const operand2 = await updateLogData(obj.data.secondValue as BlockObject, map, prevLog, setChanageLog);
    return [obj.runLogic(operand1[0], operand2[0]) + ''];
  } else if (obj.name === 'negation') {
    const operand = await updateLogData(obj.data.value as BlockObject, map, prevLog, setChanageLog);
    return [obj.runLogic(operand[0]) + ''];
  } else if (obj.name === 'timer') {
    const time = await updateLogData(obj.data.value as BlockObject, map, prevLog, setChanageLog);
    await new Promise((resolve) => setTimeout(resolve, Number(time[0]) * 1000));
    return [];
  } else if (obj.name === 'input') {
    setChanageLog([...prevLog(), '[입력 해주세요.]']);

    const waitInput = () => {
      return new Promise<string>((resolve) => {
        const onKeyDown = (e: KeyboardEvent) => {
          const input = document.querySelector('#console__input') as HTMLInputElement;
          if (e.key === 'Enter') {
            if (input.value !== '') {
              document.body.removeEventListener('keydown', onKeyDown);
              setChanageLog([...prevLog(), '[입력] ' + input.value]);
              resolve(input.value);
            } else {
              input.focus();
            }
          }
        };

        document.body.addEventListener('keydown', onKeyDown);
      });
    };

    const userInput = await waitInput();
    return [userInput];
  } else if (obj.name === 'string') {
    const operand1 = await updateLogData(obj.data.value as BlockObject, map, prevLog, setChanageLog);
    const operand2 = await updateLogData(obj.data.secondValue as BlockObject, map, prevLog, setChanageLog);
    const string = obj.runLogic(operand1[0], operand2[0]);
    if (typeof string === 'string') return [string];
  } else if (obj.name === 'randomNumber') {
    const operand = await updateLogData(obj.data.value as BlockObject, map, prevLog, setChanageLog);
    const num = obj.runLogic(operand[0]);
    if (num) return [num.toString()];
  }

  return [];
};

const restoreWorkspaceData = (block: BlockObject | BlockObject[]): BlockCommon | BlockCommon[] | null => {
  if (Array.isArray(block)) {
    let array: BlockCommon[] = [];
    block.forEach((item) => {
      if (!Array.isArray(item)) {
        const newBlock = restoreWorkspaceData(item);
        if (newBlock && newBlock instanceof BlockCommon) {
          array.push(newBlock);
        }
      }
    });

    return array;
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

const loadData = (loadWorkspaceData: WorkspaceData, updateWorkspaceDataAll: UpdateWorkspaceDataAll): void => {
  const newWorkspaceData: BlockCommon[] = [];
  loadWorkspaceData.forEach((block: BlockObject) => {
    const resotreData = restoreWorkspaceData(block);

    if (resotreData && !Array.isArray(resotreData)) {
      newWorkspaceData.push(resotreData);
    }
  });

  newWorkspaceData.forEach((block: BlockCommon) => {
    block.calcWidth();
  });

  updateWorkspaceDataAll(newWorkspaceData);
};
