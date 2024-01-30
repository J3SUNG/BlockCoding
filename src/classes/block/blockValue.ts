import { BlockCommon } from './blockClassCommon';

export class BlockValue extends BlockCommon {
  name = 'value';
  type = 'expressionValue';

  constructor(id: string, x: number, y: number) {
    super(id, x, y, '10');
  }
}
