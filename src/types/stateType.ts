import { BlockObject } from './blockObjectType';

export type SelectedBlock = number;
export type SetSelectedBlock = (selectedBlock: SelectedBlock) => void;
export type BlockList = BlockObject[];
export type SetBlockList = (blockList: BlockList) => void;
