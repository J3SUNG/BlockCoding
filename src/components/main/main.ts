import { useState } from '../../core/core';
import { createElementCommon } from '../../utils/createElementCommon';
import { blockMenu } from '../blockMenu/blockMenu';
import { consoleSpace } from '../consoleSpace/consoleSpace';
import { workspace } from '../workspace/workspace';
import { BlockList, ConsoleLog, SetBlockList } from '../../types/stateType';

interface MainProps {
  consoleLog: ConsoleLog;
  blockList: BlockList;
  setBlockList: SetBlockList;
}

export const main = ({ consoleLog, blockList, setBlockList }: MainProps) => {
  const [seqNo, setSeqNo] = useState(0);

  const blockMenuComponent = blockMenu();
  const workspaceComponent = workspace({ blockList, setBlockList, seqNo, setSeqNo });
  const consoleSpaceComponent = consoleSpace({ consoleLog });

  const main = createElementCommon('div', { id: 'main' });

  main.appendChild(blockMenuComponent);
  main.appendChild(workspaceComponent);
  main.appendChild(consoleSpaceComponent);

  return main;
};
