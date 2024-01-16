import { useState } from '../../core/core';
import { BlockPaintProps } from '../../types/blockPaintProps';

interface BlockValueProps extends BlockPaintProps {
  setBlockInputObj?: ({ x, y, value, isView, setBlockValue }: any) => void;
  value?: string;
}

export const blockValue = ({ x, y, width, height, value, id }: BlockValueProps) => {
  const valueWidth = value!.length || value!.length * 18 < 60 ? 60 : value!.length * 18;

  const color = 'lemonchiffon';
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');

  const d = `M ${x + valueWidth} ${y + height / 5} A ${height * 0.3} ${height * 0.3} 0 0 1 ${x + valueWidth} ${
    y + height - height / 5
  } L ${x + 40} ${y + height - height / 5} A ${height * 0.3} ${height * 0.3} 0 0 1 ${x + 40} ${y + height / 5} Z`;

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('fill', color);
  path.setAttribute('d', d);
  path.setAttribute('stroke', 'black');
  path.setAttribute('id', id.toString());

  const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  text.setAttribute('x', (x + 20 + valueWidth / 2).toString());
  text.setAttribute('y', (y + height / 2).toString());
  text.setAttribute('font-size', '18px');
  text.setAttribute('font-weight', 'bold');
  text.setAttribute('fill', 'black');
  text.setAttribute('text-anchor', 'middle');
  text.setAttribute('alignment-baseline', 'middle');

  const textNode = document.createTextNode(value!);
  text.appendChild(textNode);

  g.appendChild(path);
  g.appendChild(text);
  g.setAttribute('id', 'block-menu__button');

  return g;
};
