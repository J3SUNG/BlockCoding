<<<<<<< HEAD
import { BlockList, SelectedBlock, SetBlockList, SetSelectedBlock } from './stateType';
=======
type SelectedBlock = number;
type SetSelectedBlock = (selectedBlock: SelectedBlock) => void;
type BlockList = any[];
type SetBlockList = (blockList: BlockList) => void;
>>>>>>> parent of 30c6a77 (FEPIT-77 : 대소문자 변경)

export interface blockMenuProps {
  selectedBlock: SelectedBlock;
  setSelectedBlock: SetSelectedBlock;
  blockList: BlockList;
  setBlockList: SetBlockList;
}
