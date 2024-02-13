import { BlockObject } from '../../types/blockObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { BlockCommon } from './blockClassCommon';

export class BlockInput extends BlockCommon {
  name = 'input';
  type = 'expressionValue';
  defaultWidth = 60;
  defaultHeight = 40;

  constructor(id: string, x: number, y: number) {
    super(id, x, y, {} as BlockObject);
  }

  getElement(id: string, x: number, y: number) {
    const div = createElementCommon('div', { id, className: `block block--expression-value` });
    const p = createElementCommon('p', { className: 'block__text', textContent: '입력 받기' });
    this.calcWidth();

    div.setAttribute('style', `left: ${x}px; top: ${y}px; width: ${this.width}px; height: ${this.defaultHeight}px;`);
    div.appendChild(p);

    return { block: div, space: [] };
  }
}
