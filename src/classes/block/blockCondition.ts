import { BlockObject, BlockObjectValue } from '../../types/blockObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { BlockCommon } from './blockClassCommon';

export class BlockCondition extends BlockCommon {
  name = 'condition';
  type = 'control';

  constructor(id: string, x: number, y: number) {
    super(id, x, y, []);
    this.data.condition = {} as BlockObject;
  }
  setChildPosition(x: number, y: number, index: number) {
    return { childX: 50, childY: 50 * index };
  }

  paintBlock(id: string, x: number, y: number) {
    const div = createElementCommon('div', { id, className: `block block--control` });
    const p = createElementCommon('p', { className: 'block__text', textContent: '조건문' });
    const space = createElementCommon('span', { className: 'block__space' });

    div.setAttribute('style', `left: ${x}px; top: ${y}px`);
    div.appendChild(p);
    div.appendChild(space);

    return div;
  }

  insertBlock(obj: BlockObject, type: string) {
    if (this.data.condition && Object.keys(this.data.condition).length === 0) {
      if (type === 'expressionValue' || type === 'expressionLogical') {
        this.data.condition = obj;
      }
    } else if (Array.isArray(this.data.value)) {
      if (type === 'general' || type === 'control') {
        this.data.value.push(obj);
      }
    }
  }

  getInnerBlock(): BlockObjectValue[] {
    return [this.data.condition!, this.data.value];
  }
}
