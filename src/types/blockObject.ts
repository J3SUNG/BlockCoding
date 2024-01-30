export type BlockObjectValue = BlockObject | BlockObject[] | string;

export interface BlockObject {
  name: string;
  type: string;
  data: {
    id: string;
    x: number;
    y: number;
    value: BlockObjectValue;
    varName?: string;
    condition?: BlockObject;
    operator?: string;
  };
}
