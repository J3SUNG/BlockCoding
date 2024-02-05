import { BlockObject } from '../../types/blockObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { BlockCommon } from './blockClassCommon';

export class BlockString extends BlockCommon {
  name = 'string';
  type = 'expressionValue';
  defaultWidth = 110;
  defaultHeight = 40;

  constructor(id: string, x: number, y: number) {
    super(id, x, y, []);
    this.data.secondValue = {} as BlockObject;
  }

  getElement(
    id: string,
    x: number,
    y: number,
    value: string,
    onValueChange?: (id: string, value: string, insertLocation: string) => void,
  ) {
    const div = createElementCommon('div', { id, className: `block block--expression-value` });
    const p = createElementCommon('p', { className: 'block__text', textContent: '문자열' });
    const space1 = createElementCommon('span', { id: 'space1', className: 'block__space' });
    const space2 = createElementCommon('span', { id: 'space2', className: 'block__space' });

    space1.setAttribute('style', `width: ${this.spaceWidth[0]}px;`);
    space2.setAttribute('style', `width: ${this.spaceWidth[1]}px;`);
    div.setAttribute('style', `left: ${x}px; top: ${y}px; height: ${this.defaultHeight}px;`);
    div.appendChild(p);
    div.appendChild(space1);
    div.appendChild(space2);

    return { block: div, space: [space1, space2] };
  }

  insert(obj: BlockObject, insertType?: string) {
    if (obj.type === 'expressionValue' || obj.type === 'expressionLogical') {
      if (insertType === 'space1') {
        if (Object.keys(this.data.value).length === 0) {
          this.data.value = obj;
          return true;
        }
      } else if (insertType === 'space2') {
        if (this.data.secondValue && Object.keys(this.data.secondValue).length === 0) {
          this.data.secondValue = obj;
          return true;
        }
      }
    }

    return false;
  }

  runLogic(operand1: string, operand2: string): string {
    return operand1 + ' ' + operand2;
  }

  getInnerBlock(): string[] {
    return ['value', 'secondValue'];
  }
}
