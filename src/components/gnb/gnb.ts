import {
  ConsoleLog,
  ProgramState,
  UpdateConsoleLog,
  UpdateProgramState,
  UpdateWorkspaceData,
  WorkspaceData,
} from '../../types/stateType';
import { createElementCommon } from '../../utils/createElementCommon';
import { BlockObject } from '../../types/blockObject';
import { useState } from '../../core/core';
import { BlockCommon } from '../../classes/block/blockClassCommon';
import { Exception } from '../../classes/exception/exception';
import { Debug } from '../../classes/block/debug/debug';
import { restoreWorkspaceData } from '../../utils/restoreWorkspaceData';
import { unzip, zip } from '../../utils/zipBlock';
import { changeUniqueIdObj } from '../../utils/changeUniqueIdObj';

interface GnbProps {
  getWorkspaceData: () => WorkspaceData;
  updateWorkspaceData: UpdateWorkspaceData;
  getConsoleLog: () => ConsoleLog;
  updateConsoleLog: UpdateConsoleLog;
  render: () => void;
}

export const gnb = ({ getWorkspaceData, updateWorkspaceData, getConsoleLog, updateConsoleLog, render }: GnbProps) => {
  const [getProgramState, setProgramState] = useState<ProgramState>('prgramState', 'stop');
  const header = createElementCommon('header', { id: 'gnb' });
  const h1 = createElementCommon('h1', { id: 'title', textContent: 'Block Coding' });
  const nav = createElementCommon('nav', {});
  const saveButton = createElementCommon('button', { type: 'button', className: 'bg-yellow', textContent: 'Save' });
  const loadButton = createElementCommon('button', { type: 'button', className: 'bg-gray', textContent: 'Load' });
  const fileInput = createElementCommon('input', { type: 'file', accept: '.json', style: 'display: none' });
  const playButton = createElementCommon('button', { type: 'button', className: 'bg-green', textContent: '▶' });
  const pauseButton = createElementCommon('button', { type: 'button', className: 'bg-yellow', textContent: '⏸' });
  const stopButton = createElementCommon('button', { type: 'button', className: 'bg-red', textContent: '⏹' });
  const urlCopyButton = createElementCommon('button', {
    type: 'button',
    className: 'bg-gray',
    textContent: 'URL Copy',
    style: 'width: 100px',
  });

  const updateProgramState = (state: ProgramState) => {
    setProgramState(state);
    render();

    const event = new CustomEvent('ProgramStateChange', { detail: state });
    document.dispatchEvent(event);
  };

  playButton.addEventListener('click', () => {
    if (getProgramState() === 'stop') {
      runProgram(getWorkspaceData(), getConsoleLog, updateConsoleLog, updateProgramState, getProgramState);
    } else if (getProgramState() === 'pause') {
      updateProgramState('run');
    }
  });

  pauseButton.addEventListener('click', () => {
    if (getProgramState() === 'run') {
      updateProgramState('pause');
    }
  });

  stopButton.addEventListener('click', () => {
    if (getProgramState() !== 'stop') {
      updateProgramState('stop');
    }
  });

  saveButton.addEventListener('click', () => {
    const data = JSON.stringify(zip(getWorkspaceData()));
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'workspaceData.json';
    link.click();
    URL.revokeObjectURL(url);
  });

  loadButton.addEventListener('click', () => {
    fileInput.click();
  });

  urlCopyButton.addEventListener('click', () => {
    const url = new URL(window.location.origin) + '?workspaceData=';
    const zipWorkspaceData = JSON.stringify(zip(getWorkspaceData()));
    const URL_MAX_SIZE = 9600;
    const COLOR_RED = 'rgb(255 69 58)';
    const COLOR_GREEN = 'rgb(34 197 94)';
    const COLOR_GRAY = 'rgb(100 116 139)';
    const COPY_TEXT = 'URL Copy';
    const COPIED_TEXT = 'Copied!';
    const FAIL_TEXT = 'Fail Large!';
    const BUTTON_ACTIVE_TIME = 1000;

    if (urlCopyButton instanceof HTMLButtonElement) {
      urlCopyButton.disabled = true;
      if (zipWorkspaceData.length > URL_MAX_SIZE) {
        urlCopyButton.textContent = FAIL_TEXT;
        urlCopyButton.style.backgroundColor = COLOR_RED;
      } else {
        navigator.clipboard.writeText(url + zipWorkspaceData);
        urlCopyButton.textContent = COPIED_TEXT;
        urlCopyButton.style.backgroundColor = COLOR_GREEN;
      }

      setTimeout(() => {
        urlCopyButton.textContent = COPY_TEXT;
        urlCopyButton.style.backgroundColor = COLOR_GRAY;
        urlCopyButton.disabled = false;
      }, BUTTON_ACTIVE_TIME);
    }
  });

  fileInput.addEventListener('change', function (e) {
    if (fileInput instanceof HTMLInputElement) {
      const file: File | undefined = fileInput.files?.[0];

      if (file) {
        const reader: FileReader = new FileReader();

        reader.onload = function (e: ProgressEvent<FileReader>) {
          const content: string = e.target?.result as string;
          const jsonData: WorkspaceData = JSON.parse(content);

          loadData(jsonData, updateWorkspaceData, updateProgramState, updateConsoleLog);

          fileInput.value = '';
        };

        reader.readAsText(file);
      }
    }
  });

  nav.appendChild(urlCopyButton);
  nav.appendChild(saveButton);
  nav.appendChild(loadButton);
  nav.appendChild(fileInput);
  nav.appendChild(playButton);
  nav.appendChild(pauseButton);
  nav.appendChild(stopButton);

  header.appendChild(h1);
  header.appendChild(nav);

  return header;
};

const runProgram = async (
  workspaceData: WorkspaceData,
  getConsoleLog: () => ConsoleLog,
  updateConsoleLog: UpdateConsoleLog,
  updateProgramState: UpdateProgramState,
  getProgramState: () => ProgramState,
) => {
  updateProgramState('run');
  const startBlock = workspaceData.filter((block) => {
    return block.name === 'start' && block.data;
  });

  updateConsoleLog([
    { text: '[프로그램을 실행합니다.]', type: 'system' },
    { text: 'ㅤ', type: 'system' },
  ]);

  const DEFAULT_DEBUG_TIME = 0;
  const functionMap = new Map<string, BlockCommon>();
  for (const block of workspaceData) {
    if (block.name === 'function' && block instanceof BlockCommon) {
      const value = block.data.value;
      const debugManager = new Debug();
      if (value && value instanceof BlockCommon) {
        const variableMap = new Map<string, string>();
        const exceptionManager = new Exception();
        const functionName = await value.runLogic(
          variableMap,
          functionMap,
          getConsoleLog,
          updateConsoleLog,
          getProgramState,
          exceptionManager,
          debugManager,
        );
        functionMap.set(functionName, block);
      }
    }
  }

  for (const block of startBlock) {
    const variableMap = new Map<string, string>();
    const debugManager = new Debug();
    const exceptionManager = new Exception();
    if (block instanceof BlockCommon) {
      await block.runLogic(
        variableMap,
        functionMap,
        getConsoleLog,
        updateConsoleLog,
        getProgramState,
        exceptionManager,
        debugManager,
      );
    }
    if (exceptionManager.isError) {
      const errMessage = exceptionManager.errorMessage();
      updateConsoleLog([...getConsoleLog(), { text: errMessage, type: 'error' }]);
    }
  }

  updateConsoleLog([
    ...getConsoleLog(),
    { text: 'ㅤ', type: 'system' },
    { text: '[프로그램이 종료되었습니다.]', type: 'system' },
  ]);

  updateProgramState('stop');
};

const loadData = (
  loadWorkspaceData: WorkspaceData,
  updateWorkspaceData: UpdateWorkspaceData,
  updateProgramState: UpdateProgramState,
  updateConsoleLog: UpdateConsoleLog,
): void => {
  const newWorkspaceData: BlockCommon[] = [];
  loadWorkspaceData.forEach((block: BlockObject) => {
    const resotreData = restoreWorkspaceData(unzip(block));

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
