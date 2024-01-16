import { BlockPaintProps } from '../../types/blockPaintProps';

export const blockStart = ({ x, y, width, height }: BlockPaintProps) => {
  const color = 'mediumseagreen';

  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');

  const d = `M ${x + width} ${y} A ${height * 0.5} ${height * 0.5} 0 0 1 ${x + width} ${y + height} L ${x} ${
    y + height
  } L ${x - height / 5} ${y + height + height / 5} L ${x - (height / 5) * 2} ${y + height} A ${height * 0.4} ${
    height * 0.4
  } 0 0 1 ${x} ${y} Z`;
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('fill', color);
  path.setAttribute('d', d);
  path.setAttribute('stroke', 'black');

  const circleD = `M ${x - height / 5} ${y + 5} A ${height / 5} ${height / 5} 0 0 1 ${x - height / 5} ${
    y - 5 + height
  } A ${height / 5} ${height / 5} 0 0 1 ${x - height / 5} ${y + 5} Z`;
  const pathCircle = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  pathCircle.setAttribute('fill', 'white');
  pathCircle.setAttribute('d', circleD);
  pathCircle.setAttribute('stroke', 'none');

  const pathStartImg = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  const startImgD = `M ${x + height * 0} ${y + height / 2} L ${x - (height / 5) * 1.5} ${
    y + height / 2 - (height / 2) * 0.4
  } L ${x - (height / 5) * 1.5} ${y + height / 2 + (height / 2) * 0.4} Z`;
  pathStartImg.setAttribute('fill', color);
  pathStartImg.setAttribute('d', startImgD);
  pathStartImg.setAttribute('stroke', 'none');

  const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  text.setAttribute('x', (x + 20).toString());
  text.setAttribute('y', (y + height / 2).toString());
  text.setAttribute('font-size', '18px');
  text.setAttribute('font-weight', 'bold');
  text.setAttribute('fill', 'white');
  text.setAttribute('alignment-baseline', 'middle');

  const name = '시작하기 버튼을 클릭했을 때';
  const textNode = document.createTextNode(name);
  text.appendChild(textNode);

  g.appendChild(path);
  g.appendChild(pathCircle);
  g.appendChild(pathStartImg);
  g.appendChild(text);
  g.classList.add('draggable');
  g.setAttribute('id', 'block-menu__button');

  return g;
};
