import { BlockCommon } from './blockClassCommon';

export class BlockArithmetic extends BlockCommon {
  name = 'arithmetic';
  type = 'expressionValue';

  constructor(id: string, x: number, y: number) {
    super(id, x, y, []);
    this.data.operator = '+';
  }
}
