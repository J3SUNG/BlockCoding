import { BlockObject, BlockObjectValue } from '../../types/blockObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { BlockCommon } from './blockClassCommon';

export class BlockNegation extends BlockCommon {
  name = 'negation';
  type = 'expressionLogical';

  constructor(id: string, x: number, y: number) {
    super(id, x, y, {} as BlockObject);
  }

  getElement(id: string, x: number, y: number) {
    const div = createElementCommon('div', { id, className: `block block--expression-logical` });
    const p = createElementCommon('p', { className: 'block__text', textContent: '논리 부정' });
    const space = createElementCommon('span', { className: 'block__space' });

    div.setAttribute('style', `left: ${x}px; top: ${y}px`);
    div.appendChild(p);
    div.appendChild(space);

    return { block: div, space: [space] };
  }

  insert(obj: BlockObject) {
    if (Object.keys(this.data.value).length === 0) {
      if (obj.type === 'expressionValue' || obj.type === 'expressionLogical') {
        this.data.value = obj;
      }
    }
  }

  runLogic(operand1: string, operand2: string): boolean {
    const booleanOperand = operand1 === 'true' ? true : false;
    return !booleanOperand;
  }
}
