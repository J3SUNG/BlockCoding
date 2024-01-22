interface ConstantTypeObject {
  [key: string]: {
    name: 'declare' | 'general' | 'control' | 'expressionValue' | 'expressionLogical';
    korName: string;
  };
}

export const BLOCK_TYPE_OBJECT: ConstantTypeObject = {
  declare: {
    name: 'declare',
    korName: '선언문',
  },
  general: {
    name: 'general',
    korName: '일반문',
  },
  control: {
    name: 'control',
    korName: '제어문',
  },
  expressionValue: {
    name: 'expressionValue',
    korName: '표현식 값',
  },
  expressionLogical: {
    name: 'expressionLogical',
    korName: '표현식 논리',
  },
};
