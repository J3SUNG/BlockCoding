import { BlockCommon } from '../classes/block/blockClassCommon';
import { Debug } from '../classes/debug/debug';
import { Exception } from '../classes/exception/exception';
import { UpdateWorkspaceDataValue } from './stateType';

export type BlockObjectValue = BlockObject | BlockObject[] | string;

export interface BlockObject {
  name: string;
  type: string;
  fold?: boolean;
  paramSize?: number;
  data: {
    id: string;
    x: number;
    y: number;
    value: BlockObjectValue;
    varName?: BlockObject;
    funcName?: BlockObject;
    condition?: BlockObject;
    operator?: string;
    secondValue?: BlockObject;
    param1?: BlockObject;
    param2?: BlockObject;
    param3?: BlockObject;
    param4?: BlockObject;
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
    variableMap: Map<string, string>,
    functionMap: Map<string, BlockCommon>,
    prevLog: () => { text: string; type: string }[],
    setChanageLog: (log: { text: string; type: string }[]) => void,
    getProgramState: () => 'run' | 'stop' | 'pause',
    exceptionManager: Exception,
    debugManager: Debug,
  ): Promise<string>;
  calcWidth(): number;
  calcHeight(): { childHeight: number; prefixSum?: number[] };
}
