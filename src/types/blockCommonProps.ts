import { UpdateWorkspaceDataValue } from './stateType';

export interface BlockCommonProps {
  value?: string;
  type: string;
  name: string;
  x: number;
  y: number;
  id: string;
  onValueChange?: UpdateWorkspaceDataValue;
}
