import { BlockObject, BlockObjectValue } from './blockObject';

export type SelectedType = 'declare' | 'general' | 'control' | 'expressionValue' | 'expressionLogical';
export type UpdateSelectedType = (selectedType: SelectedType) => void;

export type WorkspaceData = BlockObject[];
export type UpdateWorkspaceDataAll = (workspaceData: WorkspaceData) => void;
export type UpdateWorkspaceDataValue = (targetId: string, value: BlockObjectValue, insertLocation?: string) => void;

export type ConsoleLog = string[];
export type UpdateConsoleLog = (consoleLog: ConsoleLog) => void;

export type ProgramState = 'run' | 'stop' | 'pause';
export type UpdateProgramState = (programState: ProgramState) => void;
