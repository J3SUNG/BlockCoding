import { createElementCommon } from '../../utils/createElementCommon';
import { BlockPaintProps } from '../../types/blockPaintProps';

export const blockStart = ({ x, y, id }: BlockPaintProps) => {
  const div = createElementCommon('div', { id });
  const p = createElementCommon('p', { className: 'block__text', textContent: '시작' });

  div.appendChild(p);

  return div;
};
