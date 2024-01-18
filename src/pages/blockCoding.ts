import { useState } from '../core/core';
import { gnb } from '../components/gnb/gnb';
import { main } from '../components/main/main';
import { ConsoleLog, ProgramState } from '../types/stateType';

export const blockCoding = () => {
  const [programState, setProgramState] = useState<ProgramState>('stop');
  const [consoleLog, setConsoleLog] = useState<ConsoleLog>([]);

  const gnbComponent = gnb({ setProgramState });
  const mainComponent = main({ programState, consoleLog, setConsoleLog, setProgramState });

  const fragment = document.createDocumentFragment();
  fragment.appendChild(gnbComponent);
  fragment.appendChild(mainComponent);

  return fragment;
};
