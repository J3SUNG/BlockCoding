import { render, useState } from '../core/core';
import { gnb } from '../components/gnb/gnb';
import { WorkspaceData, ConsoleLog, ProgramState, SelectedType } from '../types/stateType';
import { blockMenu } from '../components/blockMenu/blockMenu';
import { workspace } from '../components/workspace/workspace';
import { consoleSpace } from '../components/consoleSpace/consoleSpace';
import { createElementCommon } from '../utils/createElementCommon';
import { deepCopy } from '../utils/deepCopy';
import { findTargetBlock } from '../utils/findTargetBlock';
import { BlockObject, BlockObjectValue } from '../types/blockObject';

export const blockCoding = () => {
  const [getProgramState, setProgramState] = useState<ProgramState>('stop');
  const [getConsoleLog, setConsoleLog] = useState<ConsoleLog>([]);
  const [getWorkspaceData, setWorkspaceData] = useState<WorkspaceData>([]);
  const [getSelectedType, setSelectedType] = useState<SelectedType>('declare');
  const BLOCK_MENU_INDEX = 0;
  const WORKSPACE_INDEX = 1;
  const CONSOLE_SPACE_INDEX = 2;
  const GNB_INDEX = 0;

  const updateSelectedType = (newType: SelectedType) => {
    setSelectedType(newType);
    render(blockMenu({ selectedType: getSelectedType(), updateSelectedType }), mainComponent, BLOCK_MENU_INDEX);
  };

  const updateProgramState = (state: ProgramState) => {
    setProgramState(state);
    render(gnb({ getWorkspaceData, updateProgramState, updateConsoleLog }), root, GNB_INDEX);
  };

  const updateConsoleLog = (log: ConsoleLog) => {
    setConsoleLog(log);
    render(consoleSpace({ consoleLog: log }), mainComponent, CONSOLE_SPACE_INDEX);
  };

  const updateWorkspaceDataAll = (data: WorkspaceData) => {
    setWorkspaceData(data);
    render(
      workspace({ workspaceData: data, updateWorkspaceDataAll, updateWorkspaceDataValue }),
      mainComponent,
      WORKSPACE_INDEX,
    );
  };

  const updateWorkspaceDataValue = (targetId: string, value: BlockObjectValue) => {
    const newWorkspaceData = deepCopy(getWorkspaceData());
    const targetObj = findTargetBlock(targetId, newWorkspaceData);
    if (targetObj) {
      if (Array.isArray(targetObj.data.value)) {
        targetObj.data.value.push(value as BlockObject);
      } else {
        targetObj.data.value = value;
      }
    }

    setWorkspaceData(newWorkspaceData);
    render(
      workspace({ workspaceData: newWorkspaceData, updateWorkspaceDataAll, updateWorkspaceDataValue }),
      mainComponent,
      WORKSPACE_INDEX,
    );
  };

  const gnbComponent = gnb({
    getWorkspaceData,
    updateProgramState,
    updateConsoleLog,
  });
  const blockMenuComponent = blockMenu({ selectedType: getSelectedType(), updateSelectedType });
  const workspaceComponent = workspace({
    workspaceData: getWorkspaceData(),
    updateWorkspaceDataAll,
    updateWorkspaceDataValue,
  });
  const consoleSpaceComponent = consoleSpace({ consoleLog: getConsoleLog() });
  const mainComponent = createElementCommon('div', { id: 'main' });

  mainComponent.appendChild(blockMenuComponent);
  mainComponent.appendChild(workspaceComponent);
  mainComponent.appendChild(consoleSpaceComponent);

  const root = document.querySelector('#root') as HTMLElement;
  const fragment = document.createDocumentFragment();
  fragment.appendChild(gnbComponent);
  fragment.appendChild(mainComponent);

  return fragment;
};
