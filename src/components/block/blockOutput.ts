import { createElementCommon } from '../../utils/createElementCommon';

interface BlockOutputProps {
  id: string;
}

export const blockOutput = ({ id }: BlockOutputProps) => {
  const div = createElementCommon('div', { id });
  const p = createElementCommon('p', { className: 'block__text', textContent: '출력' });

  div.appendChild(p);

  return div;
};
