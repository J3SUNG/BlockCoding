import { BlockObject } from './blockObject';

export type SelectedType = number;
export type SetSelectedType = (selectedType: SelectedType) => void;

export type BlockList = BlockObject[];
export type SetBlockList = (blockList: BlockList) => void;

export type SeqNo = number;
export type SetSeqNo = (seqNo: SeqNo) => void;

export type ConsoleLog = string[];
export type SetConsoleLog = (consoleLog: ConsoleLog) => void;

export type ProgramState = 0 | 1 | 2;
export type SetProgramState = (programState: ProgramState) => void;
