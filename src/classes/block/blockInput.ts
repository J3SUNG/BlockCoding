import { BlockObject } from '../../types/blockObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { BlockCommon } from './blockClassCommon';

export class BlockInput extends BlockCommon {
  name = 'input';
  type = 'expressionValue';
  defaultWidth = 60;

  constructor(id: string, x: number, y: number) {
    super(id, x, y, {} as BlockObject);
  }
  setChildPosition(x: number, y: number, index: number) {
    return { childX: 0, childY: 50 * (index + 1) };
  }

  getElement(id: string, x: number, y: number) {
    const div = createElementCommon('div', { id, className: `block block--expression-value` });
    const p = createElementCommon('p', { className: 'block__text', textContent: '입력 받기' });
    const childWidth = this.calcWidth();

    div.setAttribute('style', `left: ${x}px; top: ${y}px; width: ${childWidth}px;`);
    div.appendChild(p);

    return { block: div, space: [] };
  }
}
