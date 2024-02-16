import { ConsoleLog, ProgramState, UpdateConsoleLog, UpdateWorkspaceData, WorkspaceData } from '../../types/stateType';
import { createElementCommon } from '../../utils/createElementCommon';
import { useState } from '../../core/core';
import { saveButton } from './saveButton';
import { urlCopyButton } from './urlCopyButton';
import { loadButton } from './loadButton';
import { fileInput } from './fileInput';
import { stopButton } from './stopButton';
import { pauseButton } from './pauseButton';
import { playButton } from './playButton';
import { jsExportButton } from './jsExportButton';

interface GnbProps {
  getWorkspaceData: () => WorkspaceData;
  updateWorkspaceData: UpdateWorkspaceData;
  getConsoleLog: () => ConsoleLog;
  updateConsoleLog: UpdateConsoleLog;
  render: () => void;
}

export const gnb = ({ getWorkspaceData, updateWorkspaceData, getConsoleLog, updateConsoleLog, render }: GnbProps) => {
  const [getProgramState, setProgramState] = useState<ProgramState>('prgramState', 'stop');
  const updateProgramState = (state: ProgramState) => {
    setProgramState(state);
    render();

    const event = new CustomEvent('ProgramStateChange', { detail: state });
    document.dispatchEvent(event);
  };

  const header = createElementCommon('header', { id: 'gnb' });
  const h1 = createElementCommon('h1', { id: 'title', textContent: 'Block Coding' });
  const nav = createElementCommon('nav', {});
  const save = saveButton({ getWorkspaceData });
  const file = fileInput({ updateWorkspaceData, updateProgramState, updateConsoleLog });
  const load = loadButton({ file });
  const play = playButton({ getProgramState, updateProgramState, getWorkspaceData, getConsoleLog, updateConsoleLog });
  const pause = pauseButton({ getProgramState, updateProgramState });
  const stop = stopButton({ getProgramState, updateProgramState });
  const urlCopy = urlCopyButton({ getWorkspaceData });
  const jsExport = jsExportButton({ getWorkspaceData });

  nav.appendChild(jsExport);
  nav.appendChild(urlCopy);
  nav.appendChild(save);
  nav.appendChild(load);
  nav.appendChild(file);
  nav.appendChild(play);
  nav.appendChild(pause);
  nav.appendChild(stop);

  header.appendChild(h1);
  header.appendChild(nav);

  return header;
};
