interface ConstantBlockMap {
  [key: string]: {
    name:
      | 'start'
      | 'variable'
      | 'output'
      | 'timer'
      | 'condition'
      | 'loop'
      | 'value'
      | 'input'
      | 'refVariable'
      | 'arithmetic'
      | 'comparison'
      | 'negation'
      | 'logical'
      | 'string'
      | 'randomNumber';
    type: 'declare' | 'general' | 'control' | 'expressionValue' | 'expressionLogical';
  };
}

export const BLOCK_MAP: ConstantBlockMap = {
  start: {
    name: 'start',
    type: 'declare',
  },
  variable: {
    name: 'variable',
    type: 'general',
  },
  output: {
    name: 'output',
    type: 'general',
  },
  timer: {
    name: 'timer',
    type: 'general',
  },
  condition: {
    name: 'condition',
    type: 'control',
  },
  loop: {
    name: 'loop',
    type: 'control',
  },
  value: {
    name: 'value',
    type: 'expressionValue',
  },
  input: {
    name: 'input',
    type: 'expressionValue',
  },
  refVariable: {
    name: 'refVariable',
    type: 'expressionValue',
  },
  arithmetic: {
    name: 'arithmetic',
    type: 'expressionValue',
  },
  string: {
    name: 'string',
    type: 'expressionValue',
  },
  randomNumber: {
    name: 'randomNumber',
    type: 'expressionValue',
  },
  comparison: {
    name: 'comparison',
    type: 'expressionLogical',
  },
  negation: {
    name: 'negation',
    type: 'expressionLogical',
  },
  logical: {
    name: 'logical',
    type: 'expressionLogical',
  },
};
