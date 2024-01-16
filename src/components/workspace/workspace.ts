import { BlockInputObj } from '../../types/blockInputObj';
import { useState } from '../../core/core';
import { BlockList, SetBlockList } from '../../types/stateType';
import { createElementCommon } from '../../utils/createElementCommon';
import { blockInput } from '../block/blockInput';
import { workspaceSvg } from './workspaceSvg';

interface WorkspaceProps {
  blockList: BlockList;
  setBlockList: SetBlockList;
}

export const workspace = ({ blockList, setBlockList }: WorkspaceProps) => {
  const section = createElementCommon('section', { id: 'workspace' });
  const trashBin = createElementCommon('div', { id: 'trash-bin' });
  const trashIcon = createElementCommon('span', { className: 'material-symbols-outlined', textContent: 'delete' });
  const [blockInputObj, setBlockInputObj] = useState<BlockInputObj>({
    x: undefined,
    y: undefined,
    value: undefined,
    isView: false,
    setBlockValue: undefined,
  });
  const svg = workspaceSvg({ blockList, setBlockList, setBlockInputObj });

  section.appendChild(svg);
  trashBin.appendChild(trashIcon);
  section.appendChild(trashBin);

  return section;
};
