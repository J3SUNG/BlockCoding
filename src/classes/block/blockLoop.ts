import { BlockObject, BlockObjectValue } from '../../types/blockObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { BlockCommon } from './blockClassCommon';

export class BlockLoop extends BlockCommon {
  name = 'loop';
  type = 'control';
  defaultWidth = 50;

  constructor(id: string, x: number, y: number) {
    super(id, x, y, []);
    this.data.condition = {} as BlockObject;
  }
  setChildPosition(x: number, y: number, index: number) {
    return { childX: 50, childY: 50 * index };
  }

  getElement(id: string, x: number, y: number) {
    const div = createElementCommon('div', { id, className: `block block--control` });
    const p = createElementCommon('p', { className: 'block__text', textContent: '반복문' });
    const space = createElementCommon('span', { className: 'block__space' });
    const childWidth = this.calcWidth();

    div.setAttribute('style', `left: ${x}px; top: ${y}px; width: ${childWidth}px;`);
    div.appendChild(p);
    div.appendChild(space);

    return { block: div, space: [space, div] };
  }

  insert(obj: BlockObject) {
    if (this.data.condition && Object.keys(this.data.condition).length === 0) {
      if (obj.type === 'expressionValue' || obj.type === 'expressionLogical') {
        this.data.condition = obj;
      }
    } else if (Array.isArray(this.data.value)) {
      if (obj.type === 'general' || obj.type === 'control') {
        this.data.value.push(obj);
      }
    }
  }

  getInnerBlock(): BlockObjectValue[] {
    return [this.data.condition!, this.data.value];
  }
}
