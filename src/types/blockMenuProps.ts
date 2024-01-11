type SelectedBlock = number;
type SetSelectedBlock = (selectedBlock: SelectedBlock) => void;
type BlockList = any[];
type SetBlockList = (blockList: BlockList) => void;

export interface blockMenuProps {
  selectedBlock: SelectedBlock;
  setSelectedBlock: SetSelectedBlock;
  blockList: BlockList;
  setBlockList: SetBlockList;
}
