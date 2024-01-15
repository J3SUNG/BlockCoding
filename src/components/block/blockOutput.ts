import { BlockPaintProps } from '../../types/blockPaintProps';

export const blockOutput = ({ x, y, width, height }: BlockPaintProps) => {
  const valueWidth = 60;
  const calcWidth = width + valueWidth;
  const color = 'tomato';

  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');

  const d = `M ${x} ${y} L ${x + height / 5} ${y + height / 5} L ${x + (height / 5) * 2} ${y} L ${
    x + calcWidth
  } ${y} A ${height * 0.5} ${height * 0.5} 0 0 1 ${x + calcWidth} ${y + height} L ${x + (height / 5) * 2} ${
    y + height
  } L ${x + height / 5} ${y + height + height / 5} L ${x} ${y + height} Z`;
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('fill', color);
  path.setAttribute('d', d);
  path.setAttribute('stroke', 'black');

  const valueD = `M ${x + valueWidth} ${y + height / 5} A ${height * 0.3} ${height * 0.3} 0 0 1 ${x + valueWidth} ${
    y + height - height / 5
  } L ${x + 40} ${y + height - height / 5} A ${height * 0.3} ${height * 0.3} 0 0 1 ${x + 40} ${y + height / 5}`;
  const pathValue = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  pathValue.setAttribute('fill', 'black');
  pathValue.setAttribute('opacity', '0.3');
  pathValue.setAttribute('d', valueD);
  pathValue.setAttribute('stroke', 'none');

  const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  text.setAttribute('x', (x + 25 + valueWidth).toString());
  text.setAttribute('y', (y + height / 2).toString());
  text.setAttribute('font-size', '18px');
  text.setAttribute('font-weight', 'bold');
  text.setAttribute('fill', 'white');
  text.setAttribute('alignment-baseline', 'middle');

  const name = '을(를) 출력';
  const textNode = document.createTextNode(name);
  text.appendChild(textNode);

  g.appendChild(path);
  g.appendChild(pathValue);
  g.appendChild(text);
  g.classList.add('draggable');

  return g;
};
