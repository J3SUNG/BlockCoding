import {
  SelectedType,
  SelectedBlock,
  SetSelectedBlock,
  SelectedTypeBlock,
  SetSelectedTypeBlock,
  BlockList,
  SetBlockList,
} from './stateType';

export interface BlockMenuBlockNavProps {
  selectedType: SelectedType;
  selectedTypeBlock: SelectedTypeBlock;
  setSelectedTypeBlock: SetSelectedTypeBlock;
  selectedBlock: SelectedBlock;
  setSelectedBlock: SetSelectedBlock;
  blockList: BlockList;
  setBlockList: SetBlockList;
}
