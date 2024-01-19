import { camelToKebab } from '../../utils/camelToKebab';
import { BlockCommonProps } from '../../types/blockCommonProps';
import { createElementCommon } from '../../utils/createElementCommon';

export const blockOutput = ({ id, x, y, type }: BlockCommonProps) => {
  const div = createElementCommon('div', { id, className: `block block--${camelToKebab({ str: type })}` });
  const p = createElementCommon('p', { className: 'block__text', textContent: '출력' });

  div.setAttribute('style', `left: ${x}px; top: ${y}px;`);
  div.appendChild(p);

  return div;
};
