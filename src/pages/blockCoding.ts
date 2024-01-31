import { useState } from '../core/core';
import { gnb } from '../components/gnb/gnb';
import { WorkspaceData, ConsoleLog, ProgramState } from '../types/stateType';
import { blockMenu } from '../components/blockMenu/blockMenu';
import { workspace } from '../components/workspace/workspace';
import { consoleSpace } from '../components/consoleSpace/consoleSpace';
import { createElementCommon } from '../utils/createElementCommon';
import { deepCopy } from '../utils/deepCopy';
import { findTargetBlock } from '../utils/findTargetBlock';
import { BlockObject, BlockObjectValue } from '../types/blockObject';

export const blockCoding = () => {
  const [programState, setProgramState] = useState<ProgramState>('programState', 'stop');
  const [consoleLog, setConsoleLog] = useState<ConsoleLog>('consoleLog', []);
  const [workspaceData, setWorkspaceData] = useState<WorkspaceData>('workspaceData', []);

  const updateProgramStateRun = () => {
    setProgramState('run');
  };

  const updateProgramStateStop = () => {
    setProgramState('stop');
  };

  const updateProgramStatePause = () => {
    setProgramState('pause');
  };

  const updateConsoleLog = (log: ConsoleLog) => {
    setConsoleLog(log);
  };

  const updateWorkspaceDataAll = (data: WorkspaceData) => {
    setWorkspaceData(data);
  };

  const updateWorkspaceDataValue = (
    targetId: string,
    value: BlockObjectValue,
    insertLocation: string | undefined,
  ): void => {
    const newWorkspaceData = deepCopy(workspaceData);
    const targetObj = findTargetBlock(targetId, newWorkspaceData);

    if (targetObj) {
      if (insertLocation === 'operator') {
        targetObj.data.operator = value as string;
      } else if (Array.isArray(targetObj.data.value)) {
        targetObj.data.value.push(value as BlockObject);
      } else {
        if (targetObj.data.value === value) {
          return;
        }
        targetObj.data.value = value;
      }
    }
    setWorkspaceData(newWorkspaceData);
  };

  const gnbComponent = gnb({
    workspaceData,
    updateProgramStateRun,
    updateProgramStateStop,
    updateProgramStatePause,
    updateConsoleLog,
  });

  const blockMenuComponent = blockMenu();
  const workspaceComponent = workspace({ workspaceData, updateWorkspaceDataAll, updateWorkspaceDataValue });
  const consoleSpaceComponent = consoleSpace({ consoleLog });

  const mainComponent = createElementCommon('div', { id: 'main' });

  mainComponent.appendChild(blockMenuComponent);
  mainComponent.appendChild(workspaceComponent);
  mainComponent.appendChild(consoleSpaceComponent);

  const fragment = document.createDocumentFragment();
  fragment.appendChild(gnbComponent);
  fragment.appendChild(mainComponent);

  return fragment;
};
