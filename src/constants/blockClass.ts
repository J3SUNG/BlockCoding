import { BlockObject, BlockObjectValue } from 'types/blockObject';

class BlockClassCommon implements BlockObject {
  name = ''; // 기본값 제공
  type = ''; // 기본값 제공
  data: BlockObject['data'];

  constructor(id: string, x: number, y: number, value: BlockObjectValue) {
    this.data = { id, x, y, value };
  }
}

export class BlockClassStart extends BlockClassCommon {
  name = 'start';
  type = 'declare';

  constructor(id: string, x: number, y: number) {
    super(id, x, y, []);
  }
}

export class BlockClassVariable extends BlockClassCommon {
  name = 'variable';
  type = 'general';

  constructor(id: string, x: number, y: number) {
    super(id, x, y, {} as BlockObject);
  }
}

export class BlockClassOutput extends BlockClassCommon {
  name = 'output';
  type = 'general';

  constructor(id: string, x: number, y: number) {
    super(id, x, y, {} as BlockObject);
  }
}

export class BlockClassTimer extends BlockClassCommon {
  name = 'timer';
  type = 'general';

  constructor(id: string, x: number, y: number) {
    super(id, x, y, {} as BlockObject);
  }
}

export class BlockClassCondition extends BlockClassCommon {
  name = 'condition';
  type = 'control';

  constructor(id: string, x: number, y: number) {
    super(id, x, y, []);
    this.data.condition = {} as BlockObject;
  }
}

export class BlockClassLoop extends BlockClassCommon {
  name = 'loop';
  type = 'control';

  constructor(id: string, x: number, y: number) {
    super(id, x, y, []);
    this.data.condition = {} as BlockObject;
  }
}

export class BlockClassValue extends BlockClassCommon {
  name = 'value';
  type = 'expressionValue';

  constructor(id: string, x: number, y: number) {
    super(id, x, y, '10');
  }
}

export class BlockClassInput extends BlockClassCommon {
  name = 'input';
  type = 'expressionValue';

  constructor(id: string, x: number, y: number) {
    super(id, x, y, {} as BlockObject);
  }
}

export class BlockClassRefVariable extends BlockClassCommon {
  name = 'refVariable';
  type = 'expressionValue';

  constructor(id: string, x: number, y: number) {
    super(id, x, y, {} as BlockObject);
  }
}

export class BlockClassArithmetic extends BlockClassCommon {
  name = 'arithmetic';
  type = 'expressionValue';

  constructor(id: string, x: number, y: number) {
    super(id, x, y, []);
    this.data.operator = '+';
  }
}

export class BlockClassComparison extends BlockClassCommon {
  name = 'comparison';
  type = 'expressionLogical';

  constructor(id: string, x: number, y: number) {
    super(id, x, y, []);
    this.data.operator = '=';
  }
}

export class BlockClassNegation extends BlockClassCommon {
  name = 'negation';
  type = 'expressionLogical';

  constructor(id: string, x: number, y: number) {
    super(id, x, y, {} as BlockObject);
  }
}

export class BlockClassLogical extends BlockClassCommon {
  name = 'logical';
  type = 'expressionLogical';

  constructor(id: string, x: number, y: number) {
    super(id, x, y, []);
    this.data.operator = 'AND';
  }
}

export const createNewBlockClass = (name: string, id: string, x: number, y: number) => {
  switch (name) {
    case 'start':
      return new BlockClassStart(id, x, y);
    case 'variable':
      return new BlockClassVariable(id, x, y);
    case 'output':
      return new BlockClassOutput(id, x, y);
    case 'timer':
      return new BlockClassTimer(id, x, y);
    case 'condition':
      return new BlockClassCondition(id, x, y);
    case 'loop':
      return new BlockClassLoop(id, x, y);
    case 'value':
      return new BlockClassValue(id, x, y);
    case 'input':
      return new BlockClassInput(id, x, y);
    case 'refVariable':
      return new BlockClassRefVariable(id, x, y);
    case 'arithmetic':
      return new BlockClassArithmetic(id, x, y);
    case 'comparison':
      return new BlockClassComparison(id, x, y);
    case 'negation':
      return new BlockClassNegation(id, x, y);
    case 'logical':
      return new BlockClassLogical(id, x, y);
    default:
      return new BlockClassStart(id, x, y);
  }
};
