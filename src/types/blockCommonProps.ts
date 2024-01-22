import { UpdateWorkspaceData, WorkspaceData } from './stateType';

export interface BlockCommonProps {
  value?: string;
  type: string;
  name: string;
  x: number;
  y: number;
  id: string;
  workspaceData?: WorkspaceData;
  updateWorkspaceData?: UpdateWorkspaceData;
}
