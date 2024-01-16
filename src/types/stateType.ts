import { BlockObject } from './blockObject';

export type SelectedType = number;
export type SetSelectedType = (selectedType: SelectedType) => void;
export type SelectedMenuBlock = number;
export type SetSelectedMenuBlock = (selectedMenuBlock: SelectedMenuBlock) => void;
export type SelectedTypeBlock = number;
export type SetSelectedTypeBlock = (selectedTypeBlock: SelectedTypeBlock) => void;
export type BlockList = BlockObject[];
export type SetBlockList = (blockList: BlockList) => void;
export type UniqueId = number;
export type SetUniqueId = (uniqueId: number) => void;
