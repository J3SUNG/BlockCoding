import { BlockList, SetBlockList } from './stateType';

export interface BlockCommonProps {
  value?: string;
  type: string;
  name: string;
  x: number;
  y: number;
  id: string;
  blockList?: BlockList;
  setBlockList?: SetBlockList;
}
