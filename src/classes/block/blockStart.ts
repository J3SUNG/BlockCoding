import { BlockObject, BlockObjectValue } from '../../types/blockObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { BlockCommon } from './blockClassCommon';

export class BlockStart extends BlockCommon {
  name = 'start';
  type = 'declare';
  BLOCK_START_MIN_WIDTH = 240;
  defaultHeight = 50;
  constructor(id: string, x: number, y: number) {
    super(id, x, y, []);
  }

  setChildPosition(index: number) {
    return { childX: 0, childY: 50 * (index + 1) };
  }

  getElement(id: string, x: number, y: number) {
    const div = createElementCommon('div', { id, className: `block block--declare` });
    const p = createElementCommon('p', { className: 'block__text', textContent: '시작하기 버튼을 클릭했을 때' });
    const childWidth = this.calcWidth();
    const triangle = createElementCommon('span', { className: 'block__triangle block--declare' });

    triangle.setAttribute(
      'style',
      `width: ${this.defaultHeight}px; height: ${this.defaultHeight}px; position: absolute; right: -${this.defaultHeight}px; clip-path: polygon(0 0, 0 100%, 60% 50%);`,
    );
    div.appendChild(triangle);
    div.setAttribute(
      'style',
      `left: ${x}px; top: ${y}px; width: ${this.BLOCK_START_MIN_WIDTH > childWidth ? this.BLOCK_START_MIN_WIDTH : childWidth}px; height: ${this.defaultHeight}px;`,
    );
    div.appendChild(p);

    return { block: div, space: [div] };
  }

  insert(obj: BlockObject): void {
    if (obj.type === 'general' || obj.type === 'control') {
      if (Array.isArray(this.data.value)) {
        this.data.value.splice(this.data.value.length, 0, obj);
      }
    }
  }

  getInnerBlock(): string[] {
    return [];
  }

  getChildBlock(): string[] {
    return ['value'];
  }
}
