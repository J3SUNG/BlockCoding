import { createElementCommon } from '../../utils/createElementCommon';
import { BlockCommon } from './blockClassCommon';

export class BlockValue extends BlockCommon {
  name = 'value';
  type = 'expressionValue';
  defaultWidth = 60;
  defaultHeight = 40;
  defaultSpaceWidth = 50;

  constructor(id: string, x: number, y: number) {
    super(id, x, y, '');
  }

  getElement(
    id: string,
    x: number,
    y: number,
    value?: string,
    onValueChange?: (id: string, value: string, insertLocation?: string) => void,
    changeBlockWdith?: () => void,
  ) {
    const div = createElementCommon('div', { id, className: `block block--expression-value` });
    const p = createElementCommon('p', { className: 'block__text', textContent: '값' });
    const input = createElementCommon('input', {
      className: 'block__input',
      value: value ? value : '',
      readonly: value ? 'false' : 'true',
    });

    this.calcWidth();

    if (value === undefined) {
      input.setAttribute('readonly', 'true');
    }

    input.addEventListener('change', (e: Event) => {
      const target = e.target;

      if (target instanceof HTMLInputElement) {
        const targetClosestDiv = target.closest('div');

        if (onValueChange && value !== target.value) {
          onValueChange(targetClosestDiv?.id ?? '', target.value);
        }
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
        if (changeBlockWdith) {
          changeBlockWdith();
        }
      }
    });

    if (input instanceof HTMLInputElement && div instanceof HTMLDivElement && span) {
      if (changeBlockWdith) {
        changeBlockWdith();
      }
    }
    input.setAttribute('style', `width: ${this.spaceWidth[0]}px;`);
    div.setAttribute('style', `left: ${x}px; top: ${y}px; width: ${this.width}px; height: ${this.defaultHeight}px;`);
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
      this.width = this.defaultWidth + this.defaultSpaceWidth;
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

      this.spaceWidth[0] = width + 20 > this.defaultSpaceWidth ? width + 20 : this.defaultSpaceWidth;
      this.width = this.spaceWidth[0] + this.defaultWidth;
    }
  }
}
