type SelectedBlock = number;
type SetSelectedBlock = (selectedBlock: SelectedBlock) => void;
type BlockList = Object[];
type SetBlockList = (blockList: BlockList) => void;

export interface BlockMenuProps {
  selectedBlock: SelectedBlock;
  setSelectedBlock: SetSelectedBlock;
  blockList: BlockList;
  setBlockList: SetBlockList;
}
