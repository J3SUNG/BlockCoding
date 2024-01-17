import { BlockObject } from '@/types/blockObjectType';
import { useState } from '../../core/core';
import { createElementCommon } from '../../utils/createElementCommon';
import { blockMenu } from '../blockMenu/blockMenu';
import { consoleSpace } from '../consoleSpace/consoleSpace';
import { workspace } from '../workspace/workspace';

export const main = () => {
  const [selectedBlock, setSelectedBlock] = useState(-1);
  const [blockList, setBlockList] = useState<BlockObject[]>([]);

  const blockMenuComponent = blockMenu({ selectedBlock, setSelectedBlock, blockList, setBlockList });
  const workspaceComponent = workspace({ blockList });
  const consoleSpaceComponent = consoleSpace();

  const main = createElementCommon('div', { id: 'main' });

  main.appendChild(blockMenuComponent);
  main.appendChild(workspaceComponent);
  main.appendChild(consoleSpaceComponent);

  return main;
};
