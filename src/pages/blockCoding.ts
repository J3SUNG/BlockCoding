import { render, useState } from '../core/core';
import { gnb } from '../components/gnb/gnb';
import { WorkspaceData, ConsoleLog } from '../types/stateType';
import { blockMenu } from '../components/blockMenu/blockMenu';
import { workspace } from '../components/workspace/workspace';
import { consoleSpace } from '../components/consoleSpace/consoleSpace';
import { createElementCommon } from '../utils/createElementCommon';
import { deepCopy } from '../utils/deepCopy';
import { findTargetBlock } from '../utils/findTargetBlock';
import { BlockObject, BlockObjectValue } from '../types/blockObject';

export const blockCoding = () => {
  const [getConsoleLog, setConsoleLog] = useState<ConsoleLog>('consoleLog', []);
  const [getWorkspaceData, setWorkspaceData] = useState<WorkspaceData>('workspaceData', []);
  const BLOCK_MENU_INDEX = 0;
  const WORKSPACE_INDEX = 1;
  const CONSOLE_SPACE_INDEX = 2;
  const GNB_INDEX = 0;

  const blockMenuRender = () => {
    render(blockMenu({ render: blockMenuRender }), mainComponent, 'blockMenu', BLOCK_MENU_INDEX);
  };

  const gnbRender = () => {
    render(
      gnb({ getWorkspaceData, updateWorkspaceData, getConsoleLog, updateConsoleLog, render: gnbRender }),
      root,
      'gnb',
      GNB_INDEX,
    );
  };

  const consoleRender = () => {
    render(consoleSpace({ consoleLog: getConsoleLog() }), mainComponent, 'consoleSpace', CONSOLE_SPACE_INDEX);
  };

  const workspaceRender = () => {
    render(
      workspace({
        workspaceData: getWorkspaceData(),
        updateWorkspaceData,
        refreshWorkspaceData,
        changeBlockWidth,
      }),
      mainComponent,
      'workspace',
      WORKSPACE_INDEX,
    );

    requestAnimationFrame(() => {
      changeBlockWidth();
    });
  };

  const updateConsoleLog = (log: ConsoleLog) => {
    setConsoleLog(log);
    consoleRender();
  };

  const updateWorkspaceData = (data: WorkspaceData) => {
    setWorkspaceData(data);
    workspaceRender();
  };

  const refreshWorkspaceData = () => {
    setWorkspaceData(getWorkspaceData());
    workspaceRender();
  };

  const changeBlockWidth = () => {
    getWorkspaceData().forEach((block) => {
      block.calcWidth();
    });
  };

  const gnbComponent = gnb({
    getWorkspaceData,
    updateWorkspaceData,
    getConsoleLog,
    updateConsoleLog,
    render: gnbRender,
  });
  const blockMenuComponent = blockMenu({ render: blockMenuRender });
  const workspaceComponent = workspace({
    workspaceData: getWorkspaceData(),
    updateWorkspaceData,
    refreshWorkspaceData,
    changeBlockWidth,
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
