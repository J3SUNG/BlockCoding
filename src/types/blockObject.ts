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
  paint(
    id: string,
    x: number,
    y: number,
    value?: BlockObjectValue,
    onValueChange?: UpdateWorkspaceDataValue,
  ): HTMLElement;
  insert(obj: BlockObject): void;
  getInnerBlock(): BlockObjectValue[];
  runLogic(operand1?: string, operand2?: string): string | boolean | Promise<void>;
}
