interface BlockTypePaintProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface BlockTypeProps extends BlockTypePaintProps {
  type: string;
  korName: string;
}

export const blockType = ({ x, y, width, height, type, korName }: BlockTypeProps) => {
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  const color = ['tomato', 'orange', 'dodgerblue', 'mediumseagreen', 'violet'];
  const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');

  if (type === 'declare') {
    path.setAttribute('d', blockTypeDeclare({ x, y, width, height }));
    path.setAttribute('fill', color[0]);
  } else if (type === 'general') {
    path.setAttribute('d', blockTypeGeneral({ x, y, width, height }));
    path.setAttribute('fill', color[1]);
  } else if (type === 'control') {
    path.setAttribute('d', blockTypeControl({ x, y, width, height }));
    path.setAttribute('fill', color[2]);
  } else if (type === 'expressionValue') {
    path.setAttribute('d', blockTypeExpressionValue({ x, y, width, height }));
    path.setAttribute('fill', color[3]);
  } else if (type === 'expressionLogical') {
    path.setAttribute('d', blockTypeExpressionLogical({ x, y, width, height }));
    path.setAttribute('fill', color[4]);
  }
  path.setAttribute('stroke', 'black');

  const textNode = document.createTextNode(korName);
  text.appendChild(textNode);
  text.setAttribute('x', (x + 50).toString());
  text.setAttribute('y', (y + height / 2 + 2).toString());
  text.setAttribute('font-size', '16px');
  text.setAttribute('font-weight', 'bold');
  text.setAttribute('fill', 'black');
  text.setAttribute('alignment-baseline', 'middle');
  text.setAttribute('text-anchor', 'middle');

  g.appendChild(path);
  g.appendChild(text);
  g.setAttribute('id', 'block-menu__button');

  return g;
};

const blockTypeDeclare = ({ x, y, width, height }: BlockTypePaintProps) => {
  return `M ${x} ${y} L ${x + width - height * 0.35} ${y} L ${x + width} ${y + height * 0.5} L ${
    x + width - height * 0.35
  } ${y + height} L ${x} ${y + height} Z`;
};

const blockTypeGeneral = ({ x, y, width, height }: BlockTypePaintProps) => {
  return `M ${x} ${y} L ${x + width} ${y} L ${x + width} ${y + height} L ${x} ${y + height} Z`;
};

const blockTypeControl = ({ x, y, width, height }: BlockTypePaintProps) => {
  return `M ${x} ${y} L ${x + width} ${y} L ${x + width} ${y + height * 0.35} L ${x + height * 0.35} ${
    y + height * 0.35
  } L ${x + height * 0.35} ${y + height * 0.65} L ${x + width} ${y + height * 0.65} L ${x + width} ${
    y + height
  } L ${x} ${y + height} Z`;
};

const blockTypeExpressionValue = ({ x, y, width, height }: BlockTypePaintProps) => {
  return `M ${x + height * 0.35} ${y} L ${x + width - height * 0.35} ${y} L ${x + width} ${y + height * 0.5} L ${
    x + width - height * 0.35
  } ${y + height} L ${x + height * 0.35} ${y + height} L ${x} ${y + height * 0.5} Z`;
};

const blockTypeExpressionLogical = ({ x, y, width, height }: BlockTypePaintProps) => {
  return `M ${x + width * 0.5} ${y} A ${width * 0.5} ${height * 0.5} 0 0 1 ${x + width * 0.5} ${y + height} A ${
    width * 0.5
  } ${height * 0.5} 0 0 1 ${x + width * 0.5} ${y} Z`;
};
