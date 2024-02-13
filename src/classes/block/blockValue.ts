import { createElementCommon } from '../../utils/createElementCommon';
import { BlockCommon } from './blockClassCommon';

export class BlockValue extends BlockCommon {
  name = 'value';
  type = 'expressionValue';
  defaultWidth = 120;
  defaultHeight = 40;

  constructor(id: string, x: number, y: number) {
    super(id, x, y, '');
  }

  getElement(
    id: string,
    x: number,
    y: number,
    value?: string,
    onValueChange?: (id: string, value: string, insertLocation?: string) => void,
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

    input.addEventListener('blur', (e: FocusEvent) => {
      const target = e.target;

      if (target instanceof HTMLInputElement) {
        const targetClosestDiv = target.closest('div');

        if (onValueChange) {
          onValueChange(targetClosestDiv?.id ?? '', target.value);
        }
      }
    });

    div.setAttribute(
      'style',
      `left: ${x}px; top: ${y}px; width: ${this.defaultWidth}px; height: ${this.defaultHeight}px;`,
    );
    div.appendChild(p);
    div.appendChild(input);

    return { block: div, space: [] };
  }
}
