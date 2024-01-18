import { createElementCommon } from '../../utils/createElementCommon';

interface BlockStartProps {
  id: string;
}

export const blockStart = ({ id }: BlockStartProps) => {
  const div = createElementCommon('div', { id });
  const p = createElementCommon('p', { className: 'block__text', textContent: '시작' });

  div.appendChild(p);

  return div;
};
