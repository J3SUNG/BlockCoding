import { BlockObject, BlockObjectValue } from '../../types/blockObject';

export class BlockCommon implements BlockObject {
  name = ''; // 기본값 제공
  type = ''; // 기본값 제공
  data: BlockObject['data'];

  constructor(id: string, x: number, y: number, value: BlockObjectValue) {
    this.data = { id, x, y, value };
  }
}
