import { BLOCK_DEFAULT_HEIGHT, BLOCK_DEFAULT_WIDTH } from '../../constants/blockDefaultMap';
import { BlockObject } from '../../types/blockObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { Exception } from '../exception/exception';
import { BlockCommon } from './blockClassCommon';
import { Debug } from '../debug/debug';

export class BlockStart extends BlockCommon {
  name = 'start';
  type = 'declare';

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

  getElement(id: string, x: number, y: number, onChange: () => void, value?: string) {
    const div = createElementCommon('div', { id, className: `block block--declare` });
    const p = createElementCommon('p', { className: 'block__text', textContent: '시작하기 버튼을 클릭했을 때' });
    const triangle = createElementCommon('span', { className: 'block__triangle block--declare' });
    const toggle = createElementCommon('button', {
      className: 'block__toggle',
      textContent: `${this.fold ? '▶' : '▼'}`,
    });

    toggle.addEventListener('click', () => {
      this.fold = !this.fold;

      onChange();
    });

    triangle.setAttribute(
      'style',
      `width: ${BLOCK_DEFAULT_HEIGHT[this.name]}px; height: ${BLOCK_DEFAULT_HEIGHT[this.name]}px; position: absolute; right: -${BLOCK_DEFAULT_HEIGHT[this.name]}px; clip-path: polygon(-1% -5%, -1% 105%, 60% 50%);`,
    );
    div.appendChild(toggle);
    div.appendChild(triangle);
    div.setAttribute(
      'style',
      `left: ${x}px; top: ${y}px; height: ${BLOCK_DEFAULT_HEIGHT[this.name]}px; overflow: ${this.fold ? 'hidden' : ''};`,
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
    this.width = BLOCK_DEFAULT_WIDTH[this.name];

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
    variableMap: Map<string, string>,
    functionMap: Map<string, BlockCommon>,
    prevLog: () => { text: string; type: string }[],
    setChanageLog: (log: { text: string; type: string }[]) => void,
    getProgramState: () => 'run' | 'stop' | 'pause',
    exceptionManager: Exception,
    debugManager: Debug,
  ): Promise<string> {
    if (!(await this.preprocessingRun(getProgramState, exceptionManager, debugManager))) {
      return '';
    }

    const value = this.data.value;

    if (Array.isArray(value)) {
      for (const child of value) {
        if (child instanceof BlockCommon) {
          await child.runLogic(
            variableMap,
            functionMap,
            prevLog,
            setChanageLog,
            getProgramState,
            exceptionManager,
            debugManager,
          );
        }
      }
    }

    return '';
  }
}
