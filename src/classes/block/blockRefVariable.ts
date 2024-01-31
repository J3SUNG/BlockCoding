import { BlockObject } from '../../types/blockObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { BlockCommon } from './blockClassCommon';

export class BlockRefVariable extends BlockCommon {
  name = 'refVariable';
  type = 'expressionValue';
  defaultWidth = 120;

  constructor(id: string, x: number, y: number) {
    super(id, x, y, {} as BlockObject);
  }

  getElement(id: string, x: number, y: number) {
    const div = createElementCommon('div', { id, className: `block block--expression-value` });
    const p = createElementCommon('p', { className: 'block__text', textContent: '변수 참조' });
    const space = createElementCommon('span', { className: 'block__space' });
    const childWidth = this.calcWidth();

    div.setAttribute('style', `left: ${x}px; top: ${y}px; width: ${childWidth}px;`);
    div.appendChild(p);
    div.appendChild(space);

    return { block: div, space: [space] };
  }

  insert(obj: BlockObject) {
    if (Object.keys(this.data.value!).length === 0) {
      if (obj.name === 'value') {
        this.data.value = obj;
      }
    }
  }
}
