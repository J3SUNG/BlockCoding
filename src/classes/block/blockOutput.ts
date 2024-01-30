import { BlockObject } from '../../types/blockObject';
import { BlockCommon } from './blockClassCommon';

export class BlockOutput extends BlockCommon {
  name = 'output';
  type = 'general';

  constructor(id: string, x: number, y: number) {
    super(id, x, y, {} as BlockObject);
  }
}
