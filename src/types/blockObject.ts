import { BlockCommon } from '../classes/block/blockClassCommon';
import { UpdateWorkspaceDataValue } from './stateType';

export type BlockObjectValue = BlockObject | BlockObject[] | string;

export interface BlockObject {
  name: string;
  type: string;
  fold?: boolean;
  data: {
    id: string;
    x: number;
    y: number;
    value: BlockObjectValue;
    varName?: BlockObject;
    condition?: BlockObject;
    operator?: string;
    secondValue?: BlockObject;
    [key: string]: BlockObjectValue | string | number | undefined;
  };
  setChildPosition(index?: number): { childX: number; childY: number };
  getElement(
    id: string,
    x: number,
    y: number,
    value?: BlockObjectValue,
    onChange?: UpdateWorkspaceDataValue,
    changeBlockWidth?: () => void,
  ): { block: HTMLElement; space: HTMLElement[] };
  insert(obj: BlockObject, insertType?: string): boolean;
  getInnerBlock(): string[];
  getChildBlock(): string[];
  runLogic(
    blockObject: BlockCommon,
    variableMap: Map<string, string>,
    prevLog: () => string[],
    setChanageLog: (log: string[]) => void,
    getProgramState: () => 'run' | 'stop' | 'pause',
  ): Promise<string>;
  calcWidth(): number;
  calcHeight(): { childHeight: number; prefixSum?: number[] };
  changeUniqueId(): void;
}
