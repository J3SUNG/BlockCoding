import { BlockCommon } from './blockClassCommon';

export class BlockStart extends BlockCommon {
  name = 'start';
  type = 'declare';

  constructor(id: string, x: number, y: number) {
    super(id, x, y, []);
  }
}
