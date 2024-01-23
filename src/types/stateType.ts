import { BlockObject } from './blockObject';

export type SelectedType = 'declare' | 'general' | 'control' | 'expressionValue' | 'expressionLogical';
export type UpdateSelectedType = (selectedType: SelectedType) => void;

export type WorkspaceData = BlockObject[];
export type UpdateWorkspaceData = (workspaceData: WorkspaceData) => void;

export type ConsoleLog = string[];
export type UpdateConsoleLog = (consoleLog: ConsoleLog) => void;

export type ProgramState = 'run' | 'stop' | 'pause';
export type UpdateProgramState = () => void;
