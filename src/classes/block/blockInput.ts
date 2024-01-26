import { BlockObject } from '../../types/blockObject';
import { BlockCommon } from './blockClassCommon';

export class BlockInput extends BlockCommon {
  name = 'input';
  type = 'expressionValue';

  constructor(id: string, x: number, y: number) {
    super(id, x, y, {} as BlockObject);
  }
}
