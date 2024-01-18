import { BlockList, SeqNo, SetBlockList, SetSeqNo } from '../../types/stateType';
import { createElementCommon } from '../../utils/createElementCommon';
import { workspaceSection } from './workspaceSection';

interface WorkspaceProps {
  blockList: BlockList;
  setBlockList: SetBlockList;
  seqNo: SeqNo;
  setSeqNo: SetSeqNo;
}

export const workspace = ({ blockList, setBlockList, seqNo, setSeqNo }: WorkspaceProps) => {
  const section = workspaceSection({ blockList, setBlockList, seqNo, setSeqNo });
  const trashBin = createElementCommon('div', { id: 'trash-bin' });
  const trashIcon = createElementCommon('span', { className: 'material-symbols-outlined', textContent: 'delete' });

  trashBin.appendChild(trashIcon);
  section.appendChild(trashBin);

  return section;
};
