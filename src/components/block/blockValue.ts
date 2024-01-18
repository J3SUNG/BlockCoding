import { createElementCommon } from '../../utils/createElementCommon';

interface BlockValueProps {
  id: string;
}

export const blockValue = ({ id }: BlockValueProps) => {
  const div = createElementCommon('div', { id });
  const p = createElementCommon('p', { className: 'block__text', textContent: '값' });

  div.appendChild(p);

  return div;
};
