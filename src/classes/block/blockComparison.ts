import { BlockCommon } from './blockClassCommon';

export class BlockComparison extends BlockCommon {
  name = 'comparison';
  type = 'expressionLogical';

  constructor(id: string, x: number, y: number) {
    super(id, x, y, []);
    this.data.operator = '=';
  }
}
