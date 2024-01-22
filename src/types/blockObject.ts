export interface BlockObject {
  name: string;
  type: string;
  data: {
    id: string;
    x: number;
    y: number;
    value: BlockObject | BlockObject[] | string;
    varName?: BlockObject;
    condition?: BlockObject;
    operator?: string;
  };
}
