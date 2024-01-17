import { BlockPaintProps } from '../../types/blockPaintProps';

interface BlockMenuBlockButtonProps {
  name: string;
  type: string;
  x: number;
  y: number;
}

export const blockMenuBlockButton = ({ name, type, x, y }: BlockMenuBlockButtonProps) => {
  const li = document.createElement('li');
  const p = document.createElement('p');
  p.setAttribute('class', 'block__text');
  p.textContent = name;

  if (type === 'declare') {
    li.setAttribute('class', 'block block--declare');
  } else if (type === 'general') {
    li.setAttribute('class', 'block block--general');
  } else if (type === 'control') {
    li.setAttribute('class', 'block block--control');
  } else if (type === 'expressionValue') {
    li.setAttribute('class', 'block block--expression-value');
  } else if (type === 'expressionLogical') {
    li.setAttribute('class', 'block block--expression-logical');
  }
  li.setAttribute('style', `left: ${x}px; top: ${y}px`);

  li.draggable = true;
  li.addEventListener('dragstart', function (event: any) {
    console.log(event.clientX, event.clientY);
    event.dataTransfer.setData('name', name);
    event.dataTransfer.setData('x', event.offsetX);
    event.dataTransfer.setData('y', event.offsetY);
    console.log(event);
  });
  li.addEventListener('dragend', function (event: any) {
    console.log(event);
  });

  li.addEventListener('mouseup', function (event: any) {
    console.log(event);
  });

  li.appendChild(p);

  return li;
};
