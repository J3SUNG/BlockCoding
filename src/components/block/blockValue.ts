import { camelToKebab } from '../../utils/camelToKebab';
import { BlockCommonProps } from '../../types/blockCommonProps';
import { createElementCommon } from '../../utils/createElementCommon';

export const blockValue = ({ id, x, y, type, value, onValueChange }: BlockCommonProps) => {
  const div = createElementCommon('div', { id, className: `block block--${camelToKebab(type)}` });
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
    const { value } = target;

    const div = target.closest('div');

    if (onValueChange) {
      onValueChange(div?.id ?? '', value);
    }
  });

  div.setAttribute('style', `left: ${x}px; top: ${y}px`);
  div.appendChild(input);

  return div;
};
