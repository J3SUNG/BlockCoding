import { PaintDiagramProps } from '../types/paintDiagramProps';

export const paintDiagram = ({ x, y, width, height, type }: PaintDiagramProps) => {
  let d = '';
  let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  let color = '';

  if (type === 'declare') {
    d = `M ${x} ${y} L ${x + width - height * 0.35} ${y} L ${x + width} ${y + height * 0.5} L ${
      x + width - height * 0.35
    } ${y + height} L ${x} ${y + height} Z`;
    color = 'green';
  } else if (type === 'general') {
    d = `M ${x} ${y} L ${x + width} ${y} L ${x + width} ${y + height} L ${x} ${y + height} Z`;
    color = 'orange';
  } else if (type === 'control') {
    d = `M ${x} ${y} L ${x + width} ${y} L ${x + width} ${y + height * 0.35} L ${x + height * 0.35} ${
      y + height * 0.35
    } L ${x + height * 0.35} ${y + height * 0.65} L ${x + width} ${y + height * 0.65} L ${x + width} ${
      y + height
    } L ${x} ${y + height} Z`;
    color = 'skyblue';
  } else if (type === 'expressionValue') {
    d = `M ${x + height * 0.35} ${y} L ${x + width - height * 0.35} ${y} L ${x + width} ${y + height * 0.5} L ${
      x + width - height * 0.35
    } ${y + height} L ${x + height * 0.35} ${y + height} L ${x} ${y + height * 0.5} Z`;
    color = 'yellow';
  } else if (type === 'expressionLogical') {
    d = `M ${x + width * 0.5} ${y} A ${width * 0.5} ${height * 0.5} 0 0 1 ${x + width * 0.5} ${y + height} A ${
      width * 0.5
    } ${height * 0.5} 0 0 1 ${x + width * 0.5} ${y} Z`;
    color = 'blue';
  }

  path.setAttribute('fill', color);
  path.setAttribute('d', d);
  path.setAttribute('stroke', 'black');

  return path;
};
