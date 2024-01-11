import { useState } from '../../core/core';
import { createElementCommon } from '../../utils/createElementCommon';
import { blockMenu } from '../blockMenu/blockMenu';
import { consoleSpace } from '../consoleSpace/consoleSpace';
import { workspace } from '../workspace/workspace';

export const main = () => {
  const [selectedBlock, setSelectedBlock] = useState(-1);

  const blockMenuComponent = blockMenu({ selectedBlock, setSelectedBlock });
  const workspaceComponent = workspace();
  const consoleSpaceComponent = consoleSpace();

  const main = createElementCommon('div', { id: 'main' });

  main.appendChild(blockMenuComponent);
  main.appendChild(workspaceComponent);
  main.appendChild(consoleSpaceComponent);

  return main;
};
