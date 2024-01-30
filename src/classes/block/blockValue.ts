import { createElementCommon } from '../../utils/createElementCommon';
import { BlockCommon } from './blockClassCommon';

export class BlockValue extends BlockCommon {
  name = 'value';
  type = 'expressionValue';

  constructor(id: string, x: number, y: number) {
    super(id, x, y, '10');
  }

  paintBlock(id: string, x: number, y: number, value?: string, onValueChange?: (id: string, value: string) => void) {
    const div = createElementCommon('div', { id, className: `block block--expression-value` });
    const input = createElementCommon('input', {
      className: 'block__input',
      value: value ? value : '10',
      readonly: value ? 'false' : 'true',
    });

    if (!value) {
      input.setAttribute('readonly', 'true');
    }

    input.addEventListener('blur', (e: FocusEvent) => {
      const target = e.target as HTMLInputElement;
      const div = target.closest('div');

      if (onValueChange && div) {
        onValueChange(div.id ?? '', target.value);
      }
    });

    div.setAttribute('style', `left: ${x}px; top: ${y}px;`);
    div.appendChild(input);

    return div;
  }
}
