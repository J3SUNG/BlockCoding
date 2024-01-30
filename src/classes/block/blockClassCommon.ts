import { BlockObject, BlockObjectValue } from '../../types/blockObject';
import { createElementCommon } from '../../utils/createElementCommon';

export class BlockCommon implements BlockObject {
  name = ''; // 기본값 제공
  type = ''; // 기본값 제공
  data: BlockObject['data'];

  constructor(id: string, x: number, y: number, value: BlockObjectValue) {
    this.data = { id, x, y, value };
  }

  setChildPosition(x: number, y: number, index?: number) {
    return { childX: this.data.x, childY: this.data.y };
  }

  paintBlock(
    id: string,
    x: number,
    y: number,
    value?: BlockObjectValue,
    onValueChange?: (id: string, value: BlockObjectValue, insertLocation?: string) => void,
  ) {
    const div = createElementCommon('div', { id, className: `block block--declare` });
    div.setAttribute('style', `left: ${x}px; top: ${y}px;`);

    return div;
  }
  insertBlock(obj: BlockObject) {
    return;
  }

  getInnerBlock(): BlockObjectValue[] {
    return [this.data.value];
  }

  runBlockLogic(operand1?: string, operand2?: string): string | boolean | Promise<void> {
    return '';
  }
}
