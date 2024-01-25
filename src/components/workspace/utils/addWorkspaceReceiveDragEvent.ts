import { UpdateWorkspaceDataAll, WorkspaceData } from '../../../types/stateType';
import { deepCopyObject } from '../../../utils/deepCopyObject';
import { onDropAnotherBlock, onDropWorkspace } from './onDropEvent';

export const addWorkspaceReceiveDragEvent = (
  section: HTMLElement,
  workspaceData: WorkspaceData,
  updateWorkspaceDataAll: UpdateWorkspaceDataAll,
) => {
  const trashBin = document.getElementById('trash-bin') as HTMLElement;
  const trashIcon = document.querySelector('#trash-bin > span') as HTMLElement;

  section.addEventListener('dragover', function (e: DragEvent) {
    e.preventDefault();
  });

  section.addEventListener('drop', function (e: DragEvent) {
    e.preventDefault();
    if (e.target === trashBin || e.target === trashIcon) {
      return;
    } else if (e.target === section) {
      const newWorkspaceData = onDropWorkspace(section, e, workspaceData);
      updateWorkspaceDataAll(newWorkspaceData);
    } else {
      const copyWorkspaceData = deepCopyObject(workspaceData);
      const target = e.target as Element;
      const uniqueId = target.closest('div')?.id ?? '';
      const name = e.dataTransfer!.getData('name');
      const type = e.dataTransfer!.getData('type');

      const newWorkspaceData = onDropAnotherBlock(uniqueId, name, type, copyWorkspaceData);
      updateWorkspaceDataAll(newWorkspaceData);
    }
  });
};
