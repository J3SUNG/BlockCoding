export const BLOCK_DEFAULT_WIDTH: { [key: string]: number } = {
  arithmetic: 80,
  comparison: 80,
  condition: 130,
  function: 130,
  functionCall: 140,
  functionReturn: 140,
  input: 50,
  logical: 80,
  loop: 130,
  negation: 110,
  output: 80,
  randomNumber: 110,
  refVariable: 110,
  start: 280,
  string: 90,
  timer: 90,
  value: 60,
  variable: 110,
  debug: 130,
};

export const BLOCK_EXPRESSION_DEFAULT_HEIGHT = 40;
export const BLOCK_GENERAL_DEFAULT_HEIGHT = 50;
export const BLOCK_BIG_DEFAULT_HEIGHT = 150;

export const BLOCK_DEFAULT_HEIGHT: { [key: string]: number } = {
  arithmetic: BLOCK_EXPRESSION_DEFAULT_HEIGHT,
  comparison: BLOCK_EXPRESSION_DEFAULT_HEIGHT,
  condition: BLOCK_BIG_DEFAULT_HEIGHT,
  function: BLOCK_BIG_DEFAULT_HEIGHT,
  functionCall: BLOCK_GENERAL_DEFAULT_HEIGHT,
  functionReturn: BLOCK_EXPRESSION_DEFAULT_HEIGHT,
  input: BLOCK_EXPRESSION_DEFAULT_HEIGHT,
  logical: BLOCK_EXPRESSION_DEFAULT_HEIGHT,
  loop: BLOCK_BIG_DEFAULT_HEIGHT,
  negation: BLOCK_EXPRESSION_DEFAULT_HEIGHT,
  output: BLOCK_GENERAL_DEFAULT_HEIGHT,
  randomNumber: BLOCK_EXPRESSION_DEFAULT_HEIGHT,
  refVariable: BLOCK_EXPRESSION_DEFAULT_HEIGHT,
  start: BLOCK_GENERAL_DEFAULT_HEIGHT,
  string: BLOCK_EXPRESSION_DEFAULT_HEIGHT,
  timer: BLOCK_GENERAL_DEFAULT_HEIGHT,
  value: BLOCK_EXPRESSION_DEFAULT_HEIGHT,
  variable: BLOCK_GENERAL_DEFAULT_HEIGHT,
  debug: BLOCK_GENERAL_DEFAULT_HEIGHT,
};

export const BLOCK_SPACE_DEFAULT_WIDTH = 50;
export const BLOCK_SPACE_DEFAULT_MARGIN = 10;
