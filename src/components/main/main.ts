import { useState } from '../../core/core';
import { createElementCommon } from '../../utils/createElementCommon';
import { blockMenu } from '../blockMenu/blockMenu';
import { consoleSpace } from '../consoleSpace/consoleSpace';
import { workspace } from '../workspace/workspace';
import { BlockList, ConsoleLog, ProgramState, SetConsoleLog, SetProgramState } from '../../types/stateType';
import { PROGRAM_RUN } from '../../constants/programState';
import { runProgram } from '../../utils/runProgram';

interface MainProps {
  consoleLog: ConsoleLog;
  programState: ProgramState;
  setConsoleLog: SetConsoleLog;
  setProgramState: SetProgramState;
}

export const main = ({ consoleLog, programState, setConsoleLog, setProgramState }: MainProps) => {
  const [blockList, setBlockList] = useState<BlockList>([]);
  const [seqNo, setSeqNo] = useState(0);

  if (programState === PROGRAM_RUN) {
    runProgram({ blockList, setConsoleLog, setProgramState });
  }

  const blockMenuComponent = blockMenu();
  const workspaceComponent = workspace({ blockList, setBlockList, seqNo, setSeqNo });
  const consoleSpaceComponent = consoleSpace({ consoleLog });

  const main = createElementCommon('div', { id: 'main' });

  main.appendChild(blockMenuComponent);
  main.appendChild(workspaceComponent);
  main.appendChild(consoleSpaceComponent);

  return main;
};
