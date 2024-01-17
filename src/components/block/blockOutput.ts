import { createElementCommon } from '../../utils/createElementCommon';
import { BlockPaintProps } from '../../types/blockPaintProps';

export const blockOutput = ({ x, y, id }: BlockPaintProps) => {
  const div = createElementCommon('div', { id });
  const p = createElementCommon('p', { className: 'block__text', textContent: '출력' });

  div.appendChild(p);

  return div;
};
