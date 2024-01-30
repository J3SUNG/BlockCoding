import { BlockObject } from '../../types/blockObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { BlockCommon } from './blockClassCommon';

export class BlockOutput extends BlockCommon {
  name = 'output';
  type = 'general';

  constructor(id: string, x: number, y: number) {
    super(id, x, y, {} as BlockObject);
  }

  setChildPosition(x: number, y: number, index: number) {
    return { childX: x, childY: 0 };
  }

  paintBlock(id: string, x: number, y: number) {
    const div = createElementCommon('div', { id, className: `block block--general` });
    const p = createElementCommon('p', { className: 'block__text', textContent: '출력' });

    div.setAttribute('style', `left: ${x}px; top: ${y}px;`);
    div.appendChild(p);

    return div;
  }
}
