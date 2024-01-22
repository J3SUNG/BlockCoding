import { BlockObject } from '../types/blockObject';

interface ConstantBlockObject {
  [key: string]: BlockObject;
}

const commponProps = {
  id: '',
  x: 20,
  y: 20,
};

export const BLOCK_OBJECT: ConstantBlockObject = {
  start: {
    name: 'start',
    type: 'declare',
    data: {
      ...commponProps,
      value: [],
    },
  },
  variable: {
    name: 'variable',
    type: 'general',
    data: {
      ...commponProps,
      varName: {} as BlockObject,
      value: {} as BlockObject,
    },
  },
  output: {
    name: 'output',
    type: 'general',
    data: {
      ...commponProps,
      value: {} as BlockObject,
    },
  },
  timer: {
    name: 'timer',
    type: 'general',
    data: {
      ...commponProps,
      value: {} as BlockObject,
    },
  },
  condition: {
    name: 'condition',
    type: 'control',
    data: {
      ...commponProps,
      condition: {} as BlockObject,
      value: [],
    },
  },
  loop: {
    name: 'loop',
    type: 'control',
    data: {
      ...commponProps,
      condition: {} as BlockObject,
      value: [],
    },
  },
  value: {
    name: 'value',
    type: 'expressionValue',
    data: {
      ...commponProps,
      value: '10',
    },
  },
  input: {
    name: 'input',
    type: 'expressionValue',
    data: {
      ...commponProps,
      value: {} as BlockObject,
    },
  },
  refVariable: {
    name: 'refVariable',
    type: 'expressionValue',
    data: {
      ...commponProps,
      value: {} as BlockObject,
    },
  },
  arithmetic: {
    name: 'arithmetic',
    type: 'expressionValue',
    data: {
      ...commponProps,
      operator: '',
      value: [],
    },
  },
  comparison: {
    name: 'comparison',
    type: 'expressionLogical',
    data: {
      ...commponProps,
      operator: '',
      value: [],
    },
  },
  negation: {
    name: 'negation',
    type: 'expressionLogical',
    data: {
      ...commponProps,
      value: {} as BlockObject,
    },
  },
  logical: {
    name: 'logical',
    type: 'expressionLogical',
    data: {
      ...commponProps,
      operator: '',
      value: [],
    },
  },
};
