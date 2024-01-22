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

// import { BlockObject } from 'types/blockObject';

// interface BlockBaseProps {
//   id: string;
//   x: number;
//   y: number;
// }

// interface BlockStartProps extends BlockBaseProps {
//   value: BlockObject[];
// }

// interface BlockVariableProps extends BlockBaseProps {
//   varName: BlockObject;
//   value: BlockObject;
// }

// interface BlockOutputProps extends BlockBaseProps {
//   value: BlockObject;
// }

// interface BlockTimerProps extends BlockBaseProps {
//   value: BlockObject;
// }

// interface BlockConditionProps extends BlockBaseProps {
//   condition: BlockObject;
//   value: BlockObject[];
// }

// interface BlockLoopProps extends BlockBaseProps {
//   condition: BlockObject;
//   value: BlockObject[];
// }

// interface BlockValueProps extends BlockBaseProps {
//   value: string;
// }

// interface BlockInputProps extends BlockBaseProps {
//   value: BlockObject;
// }

// interface BlockRefVariableProps extends BlockBaseProps {
//   value: BlockObject;
// }

// interface BlockArithmeticProps extends BlockBaseProps {
//   operator: string;
//   value: BlockObject[];
// }

// interface BlockComparisonProps extends BlockBaseProps {
//   operator: string;
//   value: BlockObject[];
// }

// interface BlockNegationProps extends BlockBaseProps {
//   value: BlockObject;
// }

// interface BlockLogicalProps extends BlockBaseProps {
//   operator: string;
//   value: BlockObject[];
// }

// class BlockBase {
//   id: string;
//   x: number;
//   y: number;

//   constructor(id: string, x: number, y: number) {
//     this.id = id;
//     this.x = x;
//     this.y = y;
//   }
// }

// export class BlockStart extends BlockBase {
//   name: string = 'start';
//   type: string = 'declare';
//   value: BlockObject[];

//   constructor(props: BlockStartProps) {
//     super(props.id, props.x, props.y);
//     this.value = props.value;
//   }
// }

// export class BlockVariable extends BlockBase {
//   name: string = 'variable';
//   type: string = 'general';
//   varName: BlockObject;
//   value: BlockObject;

//   constructor(props: BlockVariableProps) {
//     super(props.id, props.x, props.y);
//     this.varName = props.varName;
//     this.value = props.value;
//   }
// }

// export class BlockOutput extends BlockBase {
//   name: string = 'output';
//   type: string = 'general';
//   value: BlockObject;

//   constructor(props: BlockOutputProps) {
//     super(props.id, props.x, props.y);
//     this.value = props.value;
//   }
// }

// export class BlockTimer extends BlockBase {
//   name: string = 'timer';
//   type: string = 'general';
//   value: BlockObject;

//   constructor(props: BlockTimerProps) {
//     super(props.id, props.x, props.y);
//     this.value = props.value;
//   }
// }

// export class BlockCondition extends BlockBase {
//   name: string = 'condition';
//   type: string = 'control';
//   condition: BlockObject;
//   value: BlockObject[];

//   constructor(props: BlockConditionProps) {
//     super(props.id, props.x, props.y);
//     this.condition = props.condition;
//     this.value = props.value;
//   }
// }

// export class BlockLoop extends BlockBase {
//   name: string = 'loop';
//   type: string = 'control';
//   condition: BlockObject;
//   value: BlockObject[];

//   constructor(props: BlockLoopProps) {
//     super(props.id, props.x, props.y);
//     this.condition = props.condition;
//     this.value = props.value;
//   }
// }

// export class BlockValue extends BlockBase {
//   name: string = 'value';
//   type: string = 'expressionValue';
//   value: string;

//   constructor(props: BlockValueProps) {
//     super(props.id, props.x, props.y);
//     this.value = props.value;
//   }
// }

// export class BlockInput extends BlockBase {
//   name: string = 'input';
//   type: string = 'expressionValue';
//   value: BlockObject;

//   constructor(props: BlockInputProps) {
//     super(props.id, props.x, props.y);
//     this.value = props.value;
//   }
// }

// export class BlockRefVariable extends BlockBase {
//   name: string = 'refVariable';
//   type: string = 'expressionValue';
//   value: BlockObject;

//   constructor(props: BlockRefVariableProps) {
//     super(props.id, props.x, props.y);
//     this.value = props.value;
//   }
// }

// export class BlockArithmetic extends BlockBase {
//   name: string = 'arithmetic';
//   type: string = 'expressionValue';
//   operator: string;
//   value: BlockObject[];

//   constructor(props: BlockArithmeticProps) {
//     super(props.id, props.x, props.y);
//     this.operator = props.operator;
//     this.value = props.value;
//   }
// }

// export class BlockComparison extends BlockBase {
//   name: string = 'comparison';
//   type: string = 'expressionLogical';
//   operator: string;
//   value: BlockObject[];

//   constructor(props: BlockComparisonProps) {
//     super(props.id, props.x, props.y);
//     this.operator = props.operator;
//     this.value = props.value;
//   }
// }

// export class BlockNegation extends BlockBase {
//   name: string = 'negation';
//   type: string = 'expressionLogical';
//   value: BlockObject;

//   constructor(props: BlockNegationProps) {
//     super(props.id, props.x, props.y);
//     this.value = props.value;
//   }
// }

// export class BlockLogical extends BlockBase {
//   name: string = 'logical';
//   type: string = 'expressionLogical';
//   operator: string;
//   value: BlockObject[];

//   constructor(props: BlockLogicalProps) {
//     super(props.id, props.x, props.y);
//     this.operator = props.operator;
//     this.value = props.value;
//   }
// }
