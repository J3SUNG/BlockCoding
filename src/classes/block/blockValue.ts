import { BLOCK_DEFAULT_HEIGHT, BLOCK_DEFAULT_WIDTH, BLOCK_SPACE_DEFAULT_WIDTH } from '../../constants/blockDefaultMap';
import { createElementCommon } from '../../utils/createElementCommon';
import { InfinityLoop } from '../infinityLoop/infinityLoop';
import { BlockCommon } from './blockClassCommon';

export class BlockValue extends BlockCommon {
  name = 'value';
  type = 'expressionValue';

  constructor(id: string, x: number, y: number) {
    super(id, x, y, '');
  }

  getElement(
    id: string,
    x: number,
    y: number,
    value?: string,
    onChange?: (id: string, value: string, insertLocation?: string) => void,
    changeBlockWidth?: () => void,
  ) {
    const div = createElementCommon('div', { id, className: `block block--expression-value` });
    const p = createElementCommon('p', { className: 'block__text', textContent: '값' });
    const input = createElementCommon('input', {
      className: 'block__input',
      value: value ? value : '',
      readonly: value ? 'false' : 'true',
    });

    if (value === undefined) {
      input.setAttribute('readonly', 'true');
    }

    input.addEventListener('change', (e: Event) => {
      const target = e.target;

      if (onChange && target instanceof HTMLInputElement) {
        onChange(id, target.value);
      }
    });

    const main = document.getElementById('main');
    let span = document.querySelector('#measure') as HTMLSpanElement | null;
    if (!span && main) {
      span = createElementCommon('span', { style: 'font-size:20px', id: 'measure' });
      main.appendChild(span);
    }

    input.addEventListener('input', () => {
      if (input instanceof HTMLInputElement && div instanceof HTMLDivElement && span) {
        if (changeBlockWidth) {
          changeBlockWidth();
        }
      }
    });

    if (input instanceof HTMLInputElement && div instanceof HTMLDivElement && span) {
      if (changeBlockWidth) {
        changeBlockWidth();
      }
    }
    input.setAttribute('style', `width: ${this.spaceWidth[0]}px;`);
    div.setAttribute('style', `left: ${x}px; top: ${y}px; height: ${BLOCK_DEFAULT_HEIGHT[this.name]}px;`);
    div.appendChild(p);
    div.appendChild(input);

    return { block: div, space: [] };
  }

  calcWidth() {
    const div = document.getElementById(this.data.id);
    if (div) {
      const input = div.querySelector('.block__input');

      if (input && input instanceof HTMLInputElement && div instanceof HTMLDivElement) {
        this.calcValueWidth(div, input);

        input.style.width = this.spaceWidth[0].toString() + 'px';
        div.style.width = this.width.toString() + 'px';
      }
    } else {
      this.width = BLOCK_DEFAULT_WIDTH[this.name] + BLOCK_SPACE_DEFAULT_WIDTH;
    }

    return this.width;
  }

  calcValueWidth(div: HTMLDivElement, input: HTMLInputElement) {
    const span = document.querySelector('#measure');

    if (span instanceof HTMLSpanElement && input instanceof HTMLInputElement) {
      const value = input.value;
      span.style.display = 'inline-block';
      span.innerText = value;
      const width = parseInt(getComputedStyle(span).width, 10);
      span.style.display = 'none';

      this.spaceWidth[0] = width + 20 > BLOCK_SPACE_DEFAULT_WIDTH ? width + 20 : BLOCK_SPACE_DEFAULT_WIDTH;
      this.width = this.spaceWidth[0] + BLOCK_DEFAULT_HEIGHT[this.name];
    }
  }

  async runLogic(
    variableMap: Map<string, string>,
    functionMap: Map<string, BlockCommon>,
    prevLog: () => string[],
    setChanageLog: (log: string[]) => void,
    getProgramState: () => 'run' | 'stop' | 'pause',
    timeManager: InfinityLoop,
  ): Promise<string> {
    if (typeof this.data.value === 'string') {
      return this.data.value;
    } else {
      return '';
    }
  }
}
