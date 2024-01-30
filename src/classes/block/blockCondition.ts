import { BlockObject } from '../../types/blockObject';
import { BlockCommon } from './blockClassCommon';

export class BlockCondition extends BlockCommon {
  name = 'condition';
  type = 'control';

  constructor(id: string, x: number, y: number) {
    super(id, x, y, []);
    this.data.condition = {} as BlockObject;
  }
}
