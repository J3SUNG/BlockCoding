import { BlockCommon } from './blockClassCommon';

export class BlockLogical extends BlockCommon {
  name = 'logical';
  type = 'expressionLogical';

  constructor(id: string, x: number, y: number) {
    super(id, x, y, []);
    this.data.operator = 'AND';
  }
}
