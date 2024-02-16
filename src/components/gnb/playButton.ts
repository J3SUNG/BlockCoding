import { BlockCommon } from '../../classes/block/blockClassCommon';
import { Debug } from '../../classes/block/debug/debug';
import { Exception } from '../../classes/exception/exception';
import { ConsoleLog, ProgramState, UpdateConsoleLog, UpdateProgramState, WorkspaceData } from '../../types/stateType';
import { createElementCommon } from '../../utils/createElementCommon';

interface PlayButtonProps {
  getProgramState: () => ProgramState;
  updateProgramState: UpdateProgramState;
  getWorkspaceData: () => WorkspaceData;
  getConsoleLog: () => ConsoleLog;
  updateConsoleLog: UpdateConsoleLog;
}

export const playButton = ({
  getProgramState,
  updateProgramState,
  getWorkspaceData,
  getConsoleLog,
  updateConsoleLog,
}: PlayButtonProps) => {
  const element = createElementCommon('button', { type: 'button', className: 'bg-green', textContent: '▶' });

  element.addEventListener('click', () => {
    if (getProgramState() === 'stop') {
      runProgram(getWorkspaceData(), getConsoleLog, updateConsoleLog, updateProgramState, getProgramState);
    } else if (getProgramState() === 'pause') {
      updateProgramState('run');
    }
  });

  return element;
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

  updateConsoleLog([
    { text: '[프로그램을 실행합니다.]', type: 'system' },
    { text: 'ㅤ', type: 'system' },
  ]);

  const DEFAULT_DEBUG_TIME = 0;
  const functionMap = new Map<string, BlockCommon>();
  for (const block of workspaceData) {
    if (block.name === 'function' && block instanceof BlockCommon) {
      const value = block.data.value;
      const debugManager = new Debug();
      if (value && value instanceof BlockCommon) {
        const variableMap = new Map<string, string>();
        const exceptionManager = new Exception();
        const functionName = await value.runLogic(
          variableMap,
          functionMap,
          getConsoleLog,
          updateConsoleLog,
          getProgramState,
          exceptionManager,
          debugManager,
        );
        functionMap.set(functionName, block);
      }
    }
  }

  for (const block of startBlock) {
    const variableMap = new Map<string, string>();
    const debugManager = new Debug();
    const exceptionManager = new Exception();
    if (block instanceof BlockCommon) {
      await block.runLogic(
        variableMap,
        functionMap,
        getConsoleLog,
        updateConsoleLog,
        getProgramState,
        exceptionManager,
        debugManager,
      );
    }
    if (exceptionManager.isError) {
      const errMessage = exceptionManager.errorMessage();
      updateConsoleLog([...getConsoleLog(), { text: errMessage, type: 'error' }]);
    }
  }

  updateConsoleLog([
    ...getConsoleLog(),
    { text: 'ㅤ', type: 'system' },
    { text: '[프로그램이 종료되었습니다.]', type: 'system' },
  ]);

  updateProgramState('stop');
};
