import { BlockObject, BlockObjectValue } from '../../types/blockObject';
import { createElementCommon } from '../../utils/createElementCommon';

export class BlockCommon implements BlockObject {
  name = '';
  type = '';
  defaultWidth = 100;
  width = 100;
  spaceWidth = 50;
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

  runLogic(operand1?: string, operand2?: string): string | boolean | Promise<void> {
    return '';
  }

  calcWidth() {
    let count = 0;
    let addWidth = 0;

    this.getInnerBlock().forEach((innerProp) => {
      const block = this.data[innerProp];
      if (typeof block === 'object' && Object.keys(block).length === 0) {
        ++count;
      } else {
        if (block instanceof BlockCommon) {
          addWidth += block.calcWidth();
        }
      }
    });

    this.width = this.defaultWidth + this.spaceWidth * count + addWidth;

    return this.width;
  }

  getInnerBlock(): string[] {
    return ['value'];
  }

  getChildBlock(): string[] {
    return [];
  }
}
