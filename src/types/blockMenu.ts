import {
  BlockList,
  SelectedMenuBlock,
  SelectedType,
  SetBlockList,
  SetSelectedMenuBlock,
  SetSelectedType,
  SetSelectedTypeBlock,
  SetUniqueId,
  UniqueId,
} from './stateType';

export interface BlockMenuProps {
  selectedMenuBlock: SelectedMenuBlock;
  setSelectedMenuBlock: SetSelectedMenuBlock;
  blockList: BlockList;
  setBlockList: SetBlockList;
  uniqueId: UniqueId;
  setUniqueId: SetUniqueId;
}

export interface BlockMenuBlockNavProps extends BlockMenuProps {
  selectedType: SelectedType;
  setSelectedTypeBlock: SetSelectedTypeBlock;
}

export interface BlockMenuTypeNavProps {
  selectedType: SelectedType;
  setSelectedType: SetSelectedType;
  setSelectedTypeBlock: SetSelectedTypeBlock;
}
