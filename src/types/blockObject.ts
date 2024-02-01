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
    [key: string]: BlockObjectValue | string | number | undefined;
  };
  setChildPosition(x?: number, y?: number, index?: number): { childX: number; childY: number };
  getElement(
    id: string,
    x: number,
    y: number,
    value?: BlockObjectValue,
    onValueChange?: UpdateWorkspaceDataValue,
  ): { block: HTMLElement; space: HTMLElement[] };
  insert(obj: BlockObject): void;
  getInnerBlock(): string[];
  getChildBlock(): string[];
  runLogic(operand1?: string, operand2?: string): string | boolean | Promise<void>;
  calcWidth(): number;
}
