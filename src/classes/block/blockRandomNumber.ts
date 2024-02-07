import { BlockObject } from '../../types/blockObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { BlockCommon } from './blockClassCommon';

export class BlockRandomNumber extends BlockCommon {
  name = 'randomNumber';
  type = 'expressionValue';
  defaultWidth = 120;
  defaultHeight = 40;

  constructor(id: string, x: number, y: number) {
    super(id, x, y, {} as BlockObject);
  }

  getElement(id: string, x: number, y: number) {
    const div = createElementCommon('div', { id, className: `block block--expression-value` });
    const p = createElementCommon('p', { className: 'block__text', textContent: '랜덤 범위' });
    const space = createElementCommon('span', { className: 'block__space' });
    const childWidth = this.calcWidth();

    space.setAttribute('style', `width: ${this.spaceWidth[0]}px;`);
    div.setAttribute('style', `left: ${x}px; top: ${y}px; width: ${childWidth}px; height: ${this.defaultHeight}px;`);
    div.appendChild(p);
    div.appendChild(space);

    return { block: div, space: [space] };
  }

  insert(obj: BlockObject) {
    if (Object.keys(this.data.value).length === 0) {
      if (obj.type === 'expressionValue' || obj.type === 'expressionLogical') {
        this.data.value = obj;
        return true;
      }
    }
    return false;
  }

  runLogic(operand1: string): string {
    const num = Math.floor(Math.random() * Number(operand1)) + 1;
    return num.toString();
  }
}
