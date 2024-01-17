export const BLOCK_OBJECT = [
  {
    name: 'start',
    korName: '시작',
    type: 'declare',
    data: {
      value: [],
    },
  },
  {
    name: 'variable',
    korName: '변수',
    type: 'general',
    data: {
      varName: {},
      value: {},
    },
  },
  {
    name: 'output',
    korName: '출력',
    type: 'general',
    data: {
      value: {},
    },
  },
  {
    name: 'timer',
    korName: '타이머',
    type: 'general',
    data: {
      value: {},
    },
  },
  {
    name: 'condition',
    korName: '조건문',
    type: 'control',
    data: {
      condition: {},
      value: [],
    },
  },
  {
    name: 'loop',
    korName: '반복문',
    type: 'control',
    data: {
      condition: {},
      value: [],
    },
  },
  {
    name: 'value',
    korName: '값',
    type: 'expressionValue',
    data: {
      value: {},
    },
  },
  {
    name: 'input',
    korName: '입력',
    type: 'expressionValue',
    data: {
      value: {},
    },
  },
  {
    name: 'refVariable',
    korName: '변수 호출',
    type: 'expressionValue',
    data: {
      varName: {},
    },
  },
  {
    name: 'arithmetic',
    korName: '산술 연산',
    type: 'expressionValue',
    data: {
      operator: {},
      value: [],
    },
  },
  {
    name: 'comparison',
    korName: '비교 연산',
    type: 'expressionLogical',
    data: {
      operator: {},
      value: [],
    },
  },
  {
    name: 'negation',
    korName: '부정 연산',
    type: 'expressionLogical',
    data: {
      value: {},
    },
  },
  {
    name: 'logical',
    korName: '논리 연산',
    type: 'expressionLogical',
    data: {
      operator: {},
      value: [],
    },
  },
];
