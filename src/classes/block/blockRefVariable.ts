import { BlockObject } from '../../types/blockObject';
import { BlockCommon } from './blockClassCommon';

export class BlockRefVariable extends BlockCommon {
  name = 'refVariable';
  type = 'expressionValue';

  constructor(id: string, x: number, y: number) {
    super(id, x, y, {} as BlockObject);
  }
}
