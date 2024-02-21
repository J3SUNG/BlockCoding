import { BlockCommon } from '../../classes/block/blockClassCommon';
import { BlockObject } from '../../types/blockObject';
import { UpdateConsoleLog, UpdateProgramState, UpdateWorkspaceData, WorkspaceData } from '../../types/stateType';
import { changeUniqueIdObj } from '../../utils/changeUniqueIdObj';
import { createElementCommon } from '../../utils/createElementCommon';
import { restoreWorkspaceData } from '../../utils/restoreWorkspaceData';

interface FileInputProps {
  updateWorkspaceData: UpdateWorkspaceData;
  updateProgramState: UpdateProgramState;
  updateConsoleLog: UpdateConsoleLog;
}

export const fileInput = ({ updateWorkspaceData, updateProgramState, updateConsoleLog }: FileInputProps) => {
  const element = createElementCommon('input', { type: 'file', accept: '.json', style: 'display: none' });

  element.addEventListener('change', function (e) {
    if (element instanceof HTMLInputElement) {
      const file: File | undefined = element.files?.[0];

      if (file) {
        const reader: FileReader = new FileReader();

        reader.onload = function (e: ProgressEvent<FileReader>) {
          const content: string = e.target?.result as string;
          const jsonData: WorkspaceData = JSON.parse(content);

          loadData(jsonData, updateWorkspaceData, updateProgramState, updateConsoleLog);

          element.value = '';
        };

        reader.readAsText(file);
      }
    }
  });

  return element;
};

const loadData = (
  loadWorkspaceData: WorkspaceData,
  updateWorkspaceData: UpdateWorkspaceData,
  updateProgramState: UpdateProgramState,
  updateConsoleLog: UpdateConsoleLog,
): void => {
  const newWorkspaceData: BlockCommon[] = [];
  loadWorkspaceData.forEach((block: BlockObject) => {
    const resotreData = restoreWorkspaceData(block);

    if (resotreData && !Array.isArray(resotreData)) {
      newWorkspaceData.push(resotreData);
    }
  });

  changeUniqueIdObj(newWorkspaceData);
  newWorkspaceData.forEach((block: BlockCommon) => {
    block.calcWidth();
  });

  updateWorkspaceData(newWorkspaceData);
  updateProgramState('stop');
  updateConsoleLog([]);
};
