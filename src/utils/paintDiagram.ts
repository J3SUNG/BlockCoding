import { PaintDiagramProps } from '../types/paintDiagramProps';

export const paintDiagram = ({ x, y, width, height, type }: PaintDiagramProps) => {
  let d = '';
  let colorIndex = 0;
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  const color = ['tomato', 'orange', 'dodgerblue', 'mediumseagreen', 'violet'];

  if (type === 'declare') {
    d = `M ${x} ${y} L ${x + width - height * 0.35} ${y} L ${x + width} ${y + height * 0.5} L ${
      x + width - height * 0.35
    } ${y + height} L ${x} ${y + height} Z`;
    colorIndex = 0;
  } else if (type === 'general') {
    d = `M ${x} ${y} L ${x + width} ${y} L ${x + width} ${y + height} L ${x} ${y + height} Z`;
    colorIndex = 1;
  } else if (type === 'control') {
    d = `M ${x} ${y} L ${x + width} ${y} L ${x + width} ${y + height * 0.35} L ${x + height * 0.35} ${
      y + height * 0.35
    } L ${x + height * 0.35} ${y + height * 0.65} L ${x + width} ${y + height * 0.65} L ${x + width} ${
      y + height
    } L ${x} ${y + height} Z`;
    colorIndex = 2;
  } else if (type === 'expressionValue') {
    d = `M ${x + height * 0.35} ${y} L ${x + width - height * 0.35} ${y} L ${x + width} ${y + height * 0.5} L ${
      x + width - height * 0.35
    } ${y + height} L ${x + height * 0.35} ${y + height} L ${x} ${y + height * 0.5} Z`;
    colorIndex = 3;
  } else if (type === 'expressionLogical') {
    d = `M ${x + width * 0.5} ${y} A ${width * 0.5} ${height * 0.5} 0 0 1 ${x + width * 0.5} ${y + height} A ${
      width * 0.5
    } ${height * 0.5} 0 0 1 ${x + width * 0.5} ${y} Z`;
    colorIndex = 4;
  }

  path.setAttribute('fill', color[colorIndex]);
  path.setAttribute('d', d);
  path.setAttribute('stroke', 'black');

  return path;
};
