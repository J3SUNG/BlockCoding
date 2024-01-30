import { BlockObject } from '../../types/blockObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { BlockCommon } from './blockClassCommon';

export class BlockRefVariable extends BlockCommon {
  name = 'refVariable';
  type = 'expressionValue';

  constructor(id: string, x: number, y: number) {
    super(id, x, y, {} as BlockObject);
  }
  setChildPosition(x: number, y: number, index: number) {
    return { childX: 50, childY: 0 };
  }

  paintBlock(id: string, x: number, y: number) {
    const div = createElementCommon('div', { id, className: `block block--expression-value` });
    const p = createElementCommon('p', { className: 'block__text', textContent: '변수 참조' });
    const space = createElementCommon('span', { className: 'block__space' });

    div.setAttribute('style', `left: ${x}px; top: ${y}px`);
    div.appendChild(p);
    div.appendChild(space);

    return div;
  }

  insertBlock(obj: BlockObject) {
    if (Object.keys(this.data.value!).length === 0) {
      if (obj.name === 'value') {
        this.data.value = obj;
      }
    }
  }
}
