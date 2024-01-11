import { BlockList, SelectedBlock, SetBlockList, SetSelectedBlock } from './stateType';

export interface blockMenuProps {
  selectedBlock: SelectedBlock;
  setSelectedBlock: SetSelectedBlock;
  blockList: BlockList;
  setBlockList: SetBlockList;
}
