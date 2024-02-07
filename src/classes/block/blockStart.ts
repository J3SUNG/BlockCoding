import { BlockObject } from '../../types/blockObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { BlockCommon } from './blockClassCommon';

export class BlockStart extends BlockCommon {
  name = 'start';
  type = 'declare';
  defaultHeight = 50;
  defaultWidth = 280;
  constructor(id: string, x: number, y: number) {
    super(id, x, y, []);
  }

  setChildPosition(index: number) {
    const { prefixSum } = this.calcHeight();
    if (prefixSum) {
      return { childX: 0, childY: prefixSum[index] + 50 };
    } else {
      return { childX: 0, childY: 50 };
    }
  }

  getElement(
    id: string,
    x: number,
    y: number,
    value?: string,
    onChange?: (id: string, value: string, insertLocation?: string) => void,
  ) {
    const div = createElementCommon('div', { id, className: `block block--declare` });
    const p = createElementCommon('p', { className: 'block__text', textContent: '시작하기 버튼을 클릭했을 때' });
    const triangle = createElementCommon('span', { className: 'block__triangle block--declare' });
    const toggle = createElementCommon('button', {
      className: 'block__toggle',
      textContent: `${this.fold ? '▶' : '▼'}`,
    });

    toggle.addEventListener('click', () => {
      this.fold = !this.fold;
      if (onChange) {
        if (this.fold) {
          onChange(id, 'true', 'fold');
        } else {
          onChange(id, 'false', 'fold');
        }
      }
    });

    triangle.setAttribute(
      'style',
      `width: ${this.defaultHeight}px; height: ${this.defaultHeight}px; position: absolute; right: -${this.defaultHeight}px; clip-path: polygon(-1% -5%, -1% 105%, 60% 50%);`,
    );
    div.appendChild(toggle);
    div.appendChild(triangle);
    div.setAttribute(
      'style',
      `left: ${x}px; top: ${y}px; height: ${this.defaultHeight}px; overflow: ${this.fold ? 'hidden' : ''};`,
    );
    div.appendChild(p);

    return { block: div, space: [div] };
  }

  insert(obj: BlockObject, insertType?: string) {
    if (obj.type === 'general' || obj.type === 'control') {
      if (Array.isArray(this.data.value)) {
        this.data.value.splice(this.data.value.length, 0, obj);
        return true;
      }
    }
    return false;
  }

  getInnerBlock(): string[] {
    return [];
  }

  getChildBlock(): string[] {
    return ['value'];
  }

  calcWidth(): number {
    const div = document.getElementById(this.data.id);
    this.width = this.defaultWidth;

    if (div) {
      div.style.width = `${this.width}px`;
    }

    if (Array.isArray(this.data.value)) {
      this.data.value.forEach((block) => {
        if (block instanceof BlockCommon) {
          block.calcWidth();
        }
      });
    }
    return this.width;
  }

  async runLogic(
    obj: BlockCommon,
    map: Map<string, string>,
    prevLog: () => string[],
    setChanageLog: (log: string[]) => void,
    getProgramState: () => 'run' | 'stop' | 'pause',
  ): Promise<string> {
    const value = obj.data.value;

    if (Array.isArray(value)) {
      for (const child of value) {
        if (child instanceof BlockCommon) {
          await child.runLogic(child, map, prevLog, setChanageLog, getProgramState);
        }
      }
    }

    return '';
  }
}
