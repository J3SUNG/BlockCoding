import { useState } from '../../core/core';
import { createElementCommon } from '../../utils/createElementCommon';
import { blockMenu } from '../blockMenu/blockMenu';
import { consoleSpace } from '../consoleSpace/consoleSpace';
import { workspace } from '../workspace/workspace';

export const main = () => {
  const [selectedBlock, setSelectedBlock] = useState(-1);
  const [blockList, setBlockList] = useState<Object[]>([]);

  const blockMenuComponent = blockMenu({ selectedBlock, setSelectedBlock, blockList, setBlockList });
  const workspaceComponent = workspace();
  const consoleSpaceComponent = consoleSpace();

  const main = createElementCommon('div', { id: 'main' });

  main.appendChild(blockMenuComponent);
  main.appendChild(workspaceComponent);
  main.appendChild(consoleSpaceComponent);

  return main;
};
