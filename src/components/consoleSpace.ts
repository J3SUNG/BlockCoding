import { createElementCommon } from '../utils/createElementCommon';

export const consoleSpace = () => {
  const div = createElementCommon('div', { id: 'console' });
  const h1 = createElementCommon('h1', { textContent: 'Output' });
  const outputDiv = createElementCommon('div', {});
  const p = createElementCommon('p', { textContent: '결과 값이 들어갈 영역입니다.' });
  const input = createElementCommon('input', { type: 'text', name: 'input', placeholder: '입력해 주세요.' });

  outputDiv.appendChild(p);

  div.appendChild(h1);
  div.appendChild(outputDiv);
  div.appendChild(input);

  return div;
};
