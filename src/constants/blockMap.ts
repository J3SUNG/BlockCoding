interface BlockMapObject {
  [key: string]: number;
}

export const BLOCK_MAP: BlockMapObject = {
  start: 0,
  variable: 1,
  output: 2,
  timer: 3,
  condition: 4,
  loop: 5,
  value: 6,
  input: 7,
  refVariable: 8,
  arithmetic: 9,
  comparison: 10,
  negation: 11,
  logical: 12,
};

export const BLOCK_TYPE_MAP = {
  declare: 0,
  general: 1,
  control: 2,
  expressionValue: 3,
  expressionLogical: 4,
};
