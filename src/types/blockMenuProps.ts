import { BlockList, SelectedBlock, SetBlockList, SetSelectedBlock } from './stateType';

export interface BlockMenuProps {
  selectedBlock: SelectedBlock;
  setSelectedBlock: SetSelectedBlock;
  blockList: BlockList;
  setBlockList: SetBlockList;
}
