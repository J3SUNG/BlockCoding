import { camelToKebab } from '../../utils/camelToKebab';
import { BlockCommonProps } from '../../types/blockCommonProps';
import { createElementCommon } from '../../utils/createElementCommon';

export const blockStart = ({ id, x, y, type }: BlockCommonProps) => {
  const div = createElementCommon('div', { id, className: `block block--${camelToKebab(type)}` });
  const p = createElementCommon('p', { className: 'block__text', textContent: '시작' });

  const triangle = createElementCommon('div', { className: 'block--declare-triangle' });
  div.appendChild(triangle);

  div.setAttribute('style', `left: ${x}px; top: ${y}px`);
  div.appendChild(p);

  return div;
};
