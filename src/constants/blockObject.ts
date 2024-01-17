export const BLOCK_OBJECT = [
  {
    name: 'start',
    type: 'declare',
    data: {
      value: [],
    },
  },
  {
    name: 'variable',
    type: 'general',
    data: {
      varName: {},
      value: {},
    },
  },
  {
    name: 'output',
    type: 'general',
    data: {
      value: {},
    },
  },
  {
    name: 'timer',
    type: 'general',
    data: {
      value: {},
    },
  },
  {
    name: 'condition',
    type: 'control',
    data: {
      condition: {},
      value: [],
    },
  },
  {
    name: 'loop',
    type: 'control',
    data: {
      condition: {},
      value: [],
    },
  },
  {
    name: 'value',
    type: 'expressionValue',
    data: {
      value: {},
    },
  },
  {
    name: 'input',
    type: 'expressionValue',
    data: {
      value: {},
    },
  },
  {
    name: 'refVariable',
    type: 'expressionValue',
    data: {
      value: {},
    },
  },
  {
    name: 'arithmetic',
    type: 'expressionValue',
    data: {
      operator: {},
      value: [],
    },
  },
  {
    name: 'comparison',
    type: 'expressionLogical',
    data: {
      operator: {},
      value: [],
    },
  },
  {
    name: 'negation',
    type: 'expressionLogical',
    data: {
      value: {},
    },
  },
  {
    name: 'logical',
    type: 'expressionLogical',
    data: {
      operator: {},
      value: [],
    },
  },
];
