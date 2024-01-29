import { BlockObject } from '../../types/blockObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { BlockCommon } from './blockClassCommon';

export class BlockTimer extends BlockCommon {
  name = 'timer';
  type = 'general';

  constructor(id: string, x: number, y: number) {
    super(id, x, y, {} as BlockObject);
  }
  setChildPosition(x: number, y: number) {
    return { childX: 50, childY: 0 };
  }

  paintBlock(id: string, x: number, y: number) {
    const div = createElementCommon('div', { id, className: `block block--general` });
    const p = createElementCommon('p', { className: 'block__text', textContent: '타이머' });
    const space = createElementCommon('span', { className: 'block__space' });

    div.setAttribute('style', `left: ${x}px; top: ${y}px`);
    div.appendChild(p);
    div.appendChild(space);

    return div;
  }

  insertBlock(obj: BlockObject, type: string) {
    if (Object.keys(this.data.value).length === 0) {
      if (type === 'expressionValue' || type === 'expressionLogical') {
        this.data.value = obj;
      }
    }
  }
}
