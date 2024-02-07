import { BlockObject, BlockObjectValue } from '../../types/blockObject';
import { createElementCommon } from '../../utils/createElementCommon';

export class BlockCommon implements BlockObject {
  name = '';
  type = '';
  defaultWidth = 100;
  width = 100;
  defaultSpaceWidth = 50;
  defaultHeight = 50;
  spaceWidth = [50, 50];
  data: BlockObject['data'];

  constructor(id: string, x: number, y: number, value: BlockObjectValue) {
    this.data = { id, x, y, value };
  }

  setChildPosition(index?: number) {
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
  insert(obj: BlockObject): boolean {
    return false;
  }

  runLogic(operand1?: string, operand2?: string): string | boolean | Promise<void> {
    return '';
  }

  calcWidth() {
    let addWidth = 0;

    this.width = this.defaultWidth;
    this.getInnerBlock().forEach((innerProp, index) => {
      const block = this.data[innerProp];
      if (typeof block === 'object' && Object.keys(block).length === 0) {
        this.spaceWidth[index] = this.defaultSpaceWidth;
        addWidth += this.defaultSpaceWidth;
      } else if (block instanceof BlockCommon) {
        this.spaceWidth[index] = block.calcWidth();
        addWidth += this.spaceWidth[index];
      }
    });

    this.width = this.defaultWidth + addWidth;

    return this.width;
  }

  calcHeight(): { childHeight: number; prefixSum?: number[] } {
    return { childHeight: this.defaultHeight };
  }

  getInnerBlock(): string[] {
    return ['value'];
  }

  getChildBlock(): string[] {
    return [];
  }
}
