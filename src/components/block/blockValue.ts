import { createElementCommon } from '../../utils/createElementCommon';
import { BlockPaintProps } from '../../types/blockPaintProps';

interface BlockValueProps extends BlockPaintProps {
  setBlockInputObj?: ({ x, y, value, isView, setBlockValue }: any) => void;
  value?: string;
}

export const blockValue = ({ x, y, value, id }: BlockValueProps) => {
  const div = createElementCommon('div', { id });
  const p = createElementCommon('p', { className: 'block__text', textContent: '값' });

  div.appendChild(p);

  return div;
};
