import {
  BlockList,
  SelectedMenuBlock,
  SelectedType,
  SelectedTypeBlock,
  SetBlockList,
  SetSelectedMenuBlock,
  SetSelectedType,
  SetSelectedTypeBlock,
} from './stateType';

export interface BlockMenuProps {
  selectedMenuBlock: SelectedMenuBlock;
  setSelectedMenuBlock: SetSelectedMenuBlock;
  blockList: BlockList;
  setBlockList: SetBlockList;
}

export interface BlockMenuBlockNavProps extends BlockMenuProps {
  selectedType: SelectedType;
  selectedTypeBlock: SelectedTypeBlock;
  setSelectedTypeBlock: SetSelectedTypeBlock;
}

export interface BlockMenuTypeNavProps {
  selectedType: SelectedType;
  setSelectedType: SetSelectedType;
  setSelectedTypeBlock: SetSelectedTypeBlock;
}
