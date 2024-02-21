import { createElementCommon } from '../../utils/createElementCommon';

interface ConsoleSpaceProps {
  consoleLog: string[];
}

export const consoleSpace = ({ consoleLog }: ConsoleSpaceProps) => {
  const div = createElementCommon('div', { id: 'console' });
  const h1 = createElementCommon('h1', { textContent: 'Output' });
  const outputDiv = createElementCommon('div', { className: 'console__output' });

  consoleLog.forEach((item) => {
    const p = createElementCommon('p', { textContent: item });
    outputDiv.appendChild(p);
  });

  const input = createElementCommon('input', {
    id: 'console__input',
    type: 'text',
    name: 'input',
    placeholder: '입력해 주세요.',
  });

  div.appendChild(h1);
  div.appendChild(outputDiv);
  div.appendChild(input);

  return div;
};
