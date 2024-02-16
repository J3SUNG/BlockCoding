import { createElementCommon } from '../../utils/createElementCommon';

interface BlockMenuTypeNavButtonProps {
  type: string;
  korName: string;
}

export const blockMenuTypeNavButton = ({ type, korName }: BlockMenuTypeNavButtonProps) => {
  const li = createElementCommon('li', { className: `nav-type__button nav-type__button--${camelToKebab(type)}` });
  const div = createElementCommon('div', { className: 'block' });
  const p = createElementCommon('p', { className: 'nav-type__button-text', textContent: korName });

  div.appendChild(p);
  li.appendChild(div);
  li.setAttribute('style', 'position: relative;');
  div.setAttribute('style', 'width: 100%; height: 100%;');
  p.setAttribute('style', 'width: 100%; text-align: center;');

  return li;
};

const camelToKebab = (str: string) => {
  return str
    .split('')
    .map((char, index) => {
      if (char === char.toUpperCase() && char !== char.toLowerCase()) {
        return (index !== 0 ? '-' : '') + char.toLowerCase();
      }
      return char;
    })
    .join('');
};
