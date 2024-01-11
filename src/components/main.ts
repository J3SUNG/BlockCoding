import { createElementCommon } from '../utils/createElementCommon';
import { blockMenu } from './blockMenu';
import { consoleSpace } from './consoleSpace';
import { workspace } from './workspace';

export const main = () => {
  const blockMenuComponent = blockMenu();
  const workspaceComponent = workspace();
  const consoleSpaceComponent = consoleSpace();

  const main = createElementCommon('div', { id: 'main' });

  main.appendChild(blockMenuComponent);
  main.appendChild(workspaceComponent);
  main.appendChild(consoleSpaceComponent);

  return main;
};
