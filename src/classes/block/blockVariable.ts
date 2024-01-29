import { BlockObject, BlockObjectValue } from '../../types/blockObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { BlockCommon } from './blockClassCommon';

export class BlockVariable extends BlockCommon {
  name = 'variable';
  type = 'general';

  constructor(id: string, x: number, y: number) {
    super(id, x, y, {} as BlockObject);
    this.data.varName = {} as BlockObject;
  }
  setChildPosition(x: number, y: number, index: number) {
    return { childX: 50 * (index + 1), childY: 5 };
  }

  paintBlock(id: string, x: number, y: number) {
    const div = createElementCommon('div', { id, className: `block block--general` });
    const p = createElementCommon('p', { className: 'block__text', textContent: '변수 할당' });
    const space1 = createElementCommon('span', { className: 'block__space' });
    const space2 = createElementCommon('span', { className: 'block__space' });

    div.setAttribute('style', `left: ${x}px; top: ${y}px`);
    div.appendChild(p);
    div.appendChild(space1);
    div.appendChild(space2);

    return div;
  }

  insertBlock(obj: BlockObject, type: string, name: string) {
    if (this.data.varName && Object.keys(this.data.varName).length === 0) {
      if (name === 'value') {
        this.data.varName = obj;
      }
    } else if (Object.keys(this.data.value).length === 0) {
      if (type === 'expressionValue' || type === 'expressionLogical') {
        this.data.value = obj;
      }
    }
  }

  getInnerBlock(): BlockObjectValue[] {
    return [this.data.varName!, this.data.value];
  }
}
