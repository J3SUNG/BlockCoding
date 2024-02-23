import { WorkspaceData } from '../../types/stateType';
import { createElementCommon } from '../../utils/createElementCommon';

interface SaveButtonProps {
  getWorkspaceData: () => WorkspaceData;
}

export const saveButton = ({ getWorkspaceData }: SaveButtonProps) => {
  const element = createElementCommon('button', { type: 'button', className: 'bg-yellow', textContent: 'Save' });

  element.addEventListener('click', () => {
    const data = JSON.stringify(getWorkspaceData());
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'workspaceData.json';
    link.click();
    URL.revokeObjectURL(url);
  });

  return element;
};
