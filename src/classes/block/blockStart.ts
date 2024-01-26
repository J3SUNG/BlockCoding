import { createElementCommon } from '../../utils/createElementCommon';
import { BlockCommon } from './blockClassCommon';

export class BlockStart extends BlockCommon {
  name = 'start';
  type = 'declare';

  constructor(id: string, x: number, y: number) {
    super(id, x, y, []);
  }

  setChildPosition(x: number, y: number, index: number) {
    return { childX: 0, childY: 50 * (index + 1) };
  }

  paintBlock(id: string, x: number, y: number) {
    const div = createElementCommon('div', { id, className: `block block--declare` });
    const p = createElementCommon('p', { className: 'block__text', textContent: '시작하기 버튼을 클릭했을 때' });

    const triangle = createElementCommon('div', { className: 'block--declare-triangle' });
    div.appendChild(triangle);

    div.setAttribute('style', `left: ${x}px; top: ${y}px`);
    div.appendChild(p);

    return div;
  }
}
