import { BlockObject, BlockObjectValue } from '../../types/blockObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { BlockCommon } from './blockClassCommon';

export class BlockCondition extends BlockCommon {
  name = 'condition';
  type = 'control';
  defaultWidth = 100;
  defaultHeight = 150;

  constructor(id: string, x: number, y: number) {
    super(id, x, y, []);
    this.data.condition = {} as BlockObject;
  }

  setChildPosition(index: number) {
    return { childX: 0, childY: 50 * index };
  }

  getElement(id: string, x: number, y: number) {
    const div = createElementCommon('div', { id, className: `block block--control` });
    const p = createElementCommon('p', { className: 'block__text', textContent: '조건문' });
    const space = createElementCommon('span', { className: 'block__space' });
    const childWidth = this.calcWidth();
    const childSpace = createElementCommon('span', { className: 'block__child' });

    space.setAttribute('style', `width: ${this.spaceWidth[0]}px; margin-top: 5px;`);
    div.setAttribute('style', `left: ${x}px; top: ${y}px; width: ${childWidth}px; height: ${this.defaultHeight}px;`);
    p.setAttribute('style', `padding-top: 12px`);
    childSpace.setAttribute('style', `width: ${childWidth - 50}px; height: ${this.defaultHeight - 100}px;`);
    div.appendChild(p);
    div.appendChild(space);
    div.appendChild(childSpace);

    return { block: div, space: [space, childSpace] };
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

  getInnerBlock(): string[] {
    return ['condition'];
  }

  getChildBlock(): string[] {
    return ['value'];
  }
}
