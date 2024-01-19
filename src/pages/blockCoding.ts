import { useState } from '../core/core';
import { gnb } from '../components/gnb/gnb';
import { main } from '../components/main/main';
import { BlockList, ConsoleLog, ProgramState } from '../types/stateType';

export const blockCoding = () => {
  const [programState, setProgramState] = useState<ProgramState>('stop');
  const [consoleLog, setConsoleLog] = useState<ConsoleLog>([]);
  const [blockList, setBlockList] = useState<BlockList>([]);

  const gnbComponent = gnb({ programState, setProgramState, consoleLog, setConsoleLog, blockList });
  const mainComponent = main({ consoleLog, blockList, setBlockList });

  const fragment = document.createDocumentFragment();
  fragment.appendChild(gnbComponent);
  fragment.appendChild(mainComponent);

  return fragment;
};
