import { BlockObject } from './blockObjectType';

export type SelectedType = number;
export type SetSelectedType = (selectedType: SelectedType) => void;
export type SelectedBlock = number;
export type SetSelectedBlock = (selectedBlock: SelectedBlock) => void;
export type SelectedTypeBlock = number;
export type SetSelectedTypeBlock = (selectedTypeBlock: SelectedTypeBlock) => void;
export type BlockList = BlockObject[];
export type SetBlockList = (blockList: BlockList) => void;
