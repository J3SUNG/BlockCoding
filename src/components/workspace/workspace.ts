import { BlockInputObj } from '../../types/blockInputObj';
import { useState } from '../../core/core';
import { BlockList } from '../../types/stateType';
import { createElementCommon } from '../../utils/createElementCommon';
import { blockInput } from '../block/blockInput';
import { workspaceSvg } from './workspaceSvg';

export const workspace = ({ blockList }: { blockList: BlockList }) => {
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
  const svg = workspaceSvg({ blockList, setBlockInputObj });

  const input = blockInput({
    x: blockInputObj.x,
    y: blockInputObj.y,
    value: blockInputObj.value,
    isView: blockInputObj.isView,
    setBlockValue: blockInputObj.setBlockValue,
    setBlockInputObj: setBlockInputObj,
  });

  section.appendChild(svg);
  trashBin.appendChild(trashIcon);
  section.appendChild(trashBin);
  section.appendChild(input);

  return section;
};
