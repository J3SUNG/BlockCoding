import { BlockObject, BlockObjectValue } from '../../types/blockObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { BlockCommon } from './blockClassCommon';

export class BlockNegation extends BlockCommon {
  name = 'negation';
  type = 'expressionLogical';
  defaultWidth = 120;
  defaultHeight = 40;

  constructor(id: string, x: number, y: number) {
    super(id, x, y, {} as BlockObject);
  }

  getElement(id: string, x: number, y: number) {
    const div = createElementCommon('div', { id, className: `block block--expression-logical` });
    const p = createElementCommon('p', { className: 'block__text', textContent: '논리 부정' });
    const space = createElementCommon('span', { className: 'block__space' });
    const childWidth = this.calcWidth();
    const startTriangle = createElementCommon('span', { className: 'block__triangle block--expression-logical' });
    const endTriangle = createElementCommon('span', { className: 'block__triangle block--expression-logical' });

    space.setAttribute('style', `width: ${this.spaceWidth[0]}px;`);
    startTriangle.setAttribute(
      'style',
      `width: ${this.defaultHeight}px; height: ${this.defaultHeight}px; position: absolute; left: -${this.defaultHeight}px; clip-path: polygon(40% 50%, 100% 0, 100% 100%);`,
    );
    endTriangle.setAttribute(
      'style',
      `width: ${this.defaultHeight}px; height: ${this.defaultHeight}px; position: absolute; right: -${this.defaultHeight}px; clip-path: polygon(0 0, 0 100%, 60% 50%);`,
    );

    div.setAttribute('style', `left: ${x}px; top: ${y}px; width: ${childWidth}px; height: ${this.defaultHeight}px;`);
    div.appendChild(startTriangle);
    div.appendChild(endTriangle);
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

  runLogic(operand1: string): boolean {
    const booleanOperand = operand1 === 'true' ? true : false;
    return !booleanOperand;
  }
}
