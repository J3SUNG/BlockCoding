import { BlockCommon } from '../../classes/block/blockClassCommon';
import { WorkspaceData } from '../../types/stateType';
import { createElementCommon } from '../../utils/createElementCommon';

interface JsExportButtonProps {
  getWorkspaceData: () => WorkspaceData;
}

export const jsExportButton = ({ getWorkspaceData }: JsExportButtonProps) => {
  const element = createElementCommon('button', {
    type: 'button',
    className: 'bg-gray',
    textContent: 'JS Export',
    style: 'width: 100px',
  });

  element.addEventListener('click', () => {
    const workspaceData = getWorkspaceData();
    let jsCode = '';

    workspaceData.forEach((block) => {
      if (block.name === 'function' && block instanceof BlockCommon) {
        jsCode += block.getJsCode(0) + '\n';
      }
    });

    workspaceData.forEach((block) => {
      if (block.name === 'start' && block instanceof BlockCommon) {
        jsCode += block.getJsCode(0) + '\n';
      }
    });

    const blob = new Blob([jsCode], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'export.js';
    a.click();
    URL.revokeObjectURL(url);
  });

  return element;
};
