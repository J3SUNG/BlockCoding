import { BlockObject, BlockObjectValue } from '../../types/blockObject';
import { createElementCommon } from '../../utils/createElementCommon';

export class BlockCommon implements BlockObject {
  name = '';
  type = '';
  data: BlockObject['data'];

  constructor(id: string, x: number, y: number, value: BlockObjectValue) {
    this.data = { id, x, y, value };
  }

  setChildPosition(x?: number, y?: number, index?: number) {
    return { childX: 0, childY: 0 };
  }

  getElement(
    id: string,
    x: number,
    y: number,
    value?: string,
    onValueChange?: (id: string, value: string, insertLocation?: string) => void,
  ) {
    const div = createElementCommon('div', { id, className: `block block--declare` });
    div.setAttribute('style', `left: ${x}px; top: ${y}px;`);

    // TODO: 현재는 값을 순차적으로 받아서 처리하고 있지만, 추후에는 객체로 받아서 처리해야 함
    return { block: div, space: [] as HTMLElement[] };
  }
  insert(obj: BlockObject) {
    return;
  }

  getInnerBlock(): BlockObjectValue[] {
    return [this.data.value];
  }

  runLogic(operand1?: string, operand2?: string): string | boolean | Promise<void> {
    return '';
  }
}
