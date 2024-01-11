import { blockMenu } from './blockMenu';
import { consoleSpace } from './consoleSpace';
import { workspace } from './workspace';

export const main = () => {
  const blockMenuComponent = blockMenu();
  const workspaceComponent = workspace();
  const consoleSpaceComponent = consoleSpace();

  return `
  <div id="main">
    ${blockMenuComponent}
    ${workspaceComponent}
    ${consoleSpaceComponent}
  </div>
  `;
};
