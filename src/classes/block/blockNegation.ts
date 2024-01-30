import { BlockObject } from '../../types/blockObject';
import { BlockCommon } from './blockClassCommon';

export class BlockNegation extends BlockCommon {
  name = 'negation';
  type = 'expressionLogical';

  constructor(id: string, x: number, y: number) {
    super(id, x, y, {} as BlockObject);
  }
}
