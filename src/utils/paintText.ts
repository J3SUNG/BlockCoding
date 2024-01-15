import { PaintTextProps } from '../types/paintTextProps';

export const paintText = ({ x, y, name }: PaintTextProps) => {
  let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  text.setAttribute('x', (x + 50).toString());
  text.setAttribute('y', (y + 15).toString());
  text.setAttribute('text-anchor', 'middle');

  let textNode = document.createTextNode(name);
  text.appendChild(textNode);

  return text;
};
