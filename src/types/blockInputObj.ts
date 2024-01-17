export interface BlockInputObj {
  isView: boolean;
  x?: number;
  y?: number;
  value?: string;
  setBlockValue?: (value: string) => void;
}

export interface BlockInputProps extends BlockInputObj {
  setBlockInputObj: (obj: BlockInputObj) => void;
}
