import { BlockObject, BlockObjectValue } from '../../types/blockObject';
import { createElementCommon } from '../../utils/createElementCommon';

export class BlockCommon implements BlockObject {
  name = ''; // 기본값 제공
  type = ''; // 기본값 제공
  data: BlockObject['data'];

  constructor(id: string, x: number, y: number, value: BlockObjectValue) {
    this.data = { id, x, y, value };
  }

  setChildPosition() {
    // TODO : 추후 구현 예정
    return { childX: this.data.x, childY: this.data.y };
  }

  paintBlock(id: string, x: number, y: number) {
    const div = createElementCommon('div', { id, className: `block block--declare` });
    div.setAttribute('style', `left: ${x}px; top: ${y}px;`);

    return div;
  }
}
