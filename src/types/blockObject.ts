import { UpdateWorkspaceDataValue } from './stateType';

export type BlockObjectValue = BlockObject | BlockObject[] | string;

export interface BlockObject {
  name: string;
  type: string;
  data: {
    id: string;
    x: number;
    y: number;
    value: BlockObjectValue;
    varName?: BlockObject;
    condition?: BlockObject;
    operator?: string;
    secondValue?: BlockObject;
  };
  setChildPosition(x?: number, y?: number, index?: number): { childX: number; childY: number };
  paintBlock(
    id: string,
    x: number,
    y: number,
    value?: BlockObjectValue,
    onValueChange?: UpdateWorkspaceDataValue,
  ): HTMLElement;
  insertBlock(obj: BlockObject, type: string, name?: string): void;
  getInnerBlock(): BlockObjectValue[];
  runBlockLogic(operand1?: string, operand2?: string): string | boolean | Promise<void>;
}
