import { createElementCommon } from '../../utils/createElementCommon';

interface LoadButtonProps {
  file: HTMLElement;
}

export const loadButton = ({ file }: LoadButtonProps) => {
  const element = createElementCommon('button', { type: 'button', className: 'bg-gray', textContent: 'Load' });

  element.addEventListener('click', () => {
    file.click();
  });

  return element;
};
