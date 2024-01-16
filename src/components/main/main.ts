import { BlockObject } from '../../types/blockObject';
import { useState } from '../../core/core';
import { createElementCommon } from '../../utils/createElementCommon';
import { blockMenu } from '../blockMenu/blockMenu';
import { consoleSpace } from '../consoleSpace/consoleSpace';
import { workspace } from '../workspace/workspace';

export const main = () => {
  const [selectedMenuBlock, setSelectedMenuBlock] = useState(-1);
  const [blockList, setBlockList] = useState<BlockObject[]>([]);
  const [uniqueId, setUniqueId] = useState(0);

  const blockMenuComponent = blockMenu({
    selectedMenuBlock,
    setSelectedMenuBlock,
    blockList,
    setBlockList,
    uniqueId,
    setUniqueId,
  });
  const workspaceComponent = workspace({ blockList, setBlockList });
  const consoleSpaceComponent = consoleSpace();

  const main = createElementCommon('div', { id: 'main' });

  main.appendChild(blockMenuComponent);
  main.appendChild(workspaceComponent);
  main.appendChild(consoleSpaceComponent);

  return main;
};
