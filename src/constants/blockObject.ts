import { BlockObject } from '../types/blockObject';

export const BLOCK_OBJECT: BlockObject[] = [
  {
    name: 'start',
    type: 'declare',
    data: {
      id: '',
      x: 20,
      y: 20,
      value: [] as BlockObject[],
    },
  },
  {
    name: 'variable',
    type: 'general',
    data: {
      id: '',
      x: 20,
      y: 20,
      varName: {} as BlockObject,
      value: {} as BlockObject,
    },
  },
  {
    name: 'output',
    type: 'general',
    data: {
      id: '',
      x: 20,
      y: 20,
      value: {} as BlockObject,
    },
  },
  {
    name: 'timer',
    type: 'general',
    data: {
      id: '',
      x: 20,
      y: 20,
      value: {} as BlockObject,
    },
  },
  {
    name: 'condition',
    type: 'control',
    data: {
      id: '',
      x: 20,
      y: 20,
      condition: {} as BlockObject,
      value: [] as BlockObject[],
    },
  },
  {
    name: 'loop',
    type: 'control',
    data: {
      id: '',
      x: 20,
      y: 20,
      condition: {} as BlockObject,
      value: [] as BlockObject[],
    },
  },
  {
    name: 'value',
    type: 'expressionValue',
    data: {
      id: '',
      x: 20,
      y: 20,
      value: '값' as string,
    },
  },
  {
    name: 'input',
    type: 'expressionValue',
    data: {
      id: '',
      x: 20,
      y: 20,
      value: {} as BlockObject,
    },
  },
  {
    name: 'refVariable',
    type: 'expressionValue',
    data: {
      id: '',
      x: 20,
      y: 20,
      value: {} as BlockObject,
    },
  },
  {
    name: 'arithmetic',
    type: 'expressionValue',
    data: {
      id: '',
      x: 20,
      y: 20,
      operator: {} as BlockObject,
      value: [] as BlockObject[],
    },
  },
  {
    name: 'comparison',
    type: 'expressionLogical',
    data: {
      id: '',
      x: 20,
      y: 20,
      operator: {} as BlockObject,
      value: [] as BlockObject[],
    },
  },
  {
    name: 'negation',
    type: 'expressionLogical',
    data: {
      id: '',
      x: 20,
      y: 20,
      value: {} as BlockObject,
    },
  },
  {
    name: 'logical',
    type: 'expressionLogical',
    data: {
      id: '',
      x: 20,
      y: 20,
      operator: {} as BlockObject,
      value: [] as BlockObject[],
    },
  },
];
