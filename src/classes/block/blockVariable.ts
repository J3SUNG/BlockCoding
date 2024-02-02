import { BlockObject, BlockObjectValue } from '../../types/blockObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { BlockCommon } from './blockClassCommon';

export class BlockVariable extends BlockCommon {
  name = 'variable';
  type = 'general';
  defaultWidth = 130;
  defaultHeight = 50;

  constructor(id: string, x: number, y: number) {
    super(id, x, y, {} as BlockObject);
    this.data.varName = {} as BlockObject;
  }

  getElement(id: string, x: number, y: number) {
    const div = createElementCommon('div', { id, className: `block block--general` });
    const p = createElementCommon('p', { className: 'block__text', textContent: '변수 할당' });
    const space1 = createElementCommon('span', { className: 'block__space' });
    const space2 = createElementCommon('span', { className: 'block__space' });
    const childWidth = this.calcWidth();

    space1.setAttribute('style', `width: ${this.spaceWidth[0]}px;`);
    space2.setAttribute('style', `width: ${this.spaceWidth[1]}px;`);
    div.setAttribute('style', `left: ${x}px; top: ${y}px; width: ${childWidth}px; height: ${this.defaultHeight}px;`);
    div.appendChild(p);
    div.appendChild(space1);
    div.appendChild(space2);

    return { block: div, space: [space1, space2] };
  }

  insert(obj: BlockObject) {
    if (this.data.varName && Object.keys(this.data.varName).length === 0) {
      if (obj.name === 'value') {
        this.data.varName = obj;
        return true;
      }
    } else if (Object.keys(this.data.value).length === 0) {
      if (obj.type === 'expressionValue' || obj.type === 'expressionLogical') {
        this.data.value = obj;
        return true;
      }
    }
    return false;
  }

  getInnerBlock(): string[] {
    return ['varName', 'value'];
  }
}
