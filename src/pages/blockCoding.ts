import { useState } from '../core/core';
import { gnb } from '../components/gnb/gnb';
import { WorkspaceData, ConsoleLog, ProgramState } from '../types/stateType';
import { blockMenu } from '../components/blockMenu/blockMenu';
import { workspace } from '../components/workspace/workspace';
import { consoleSpace } from '../components/consoleSpace/consoleSpace';
import { createElementCommon } from '../utils/createElementCommon';

export const blockCoding = () => {
  const [programState, setProgramState] = useState<ProgramState>('stop');
  const [consoleLog, setConsoleLog] = useState<ConsoleLog>([]);
  const [workspaceData, setWorkspaceData] = useState<WorkspaceData>([]);
  const [seqNo, setSeqNo] = useState(0);

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

  const updateWorkspaceData = (data: WorkspaceData) => {
    setWorkspaceData(data);
  };

  const increaseSeqNo = () => {
    setSeqNo(seqNo + 1);
  };

  const gnbComponent = gnb({
    workspaceData,
    updateProgramStateRun,
    updateProgramStateStop,
    updateProgramStatePause,
    updateConsoleLog,
  });

  const blockMenuComponent = blockMenu();
  const workspaceComponent = workspace({ workspaceData, updateWorkspaceData });
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
