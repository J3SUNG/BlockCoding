import { blockStart } from './blockStart';
import { blockOutput } from './blockOutput';
import { blockValue } from './blockValue';

interface BlockControllerProps {
  value?: string;
  type: string;
  name: string;
  x: number;
  y: number;
  id: string;
}

export const blockController = ({ x, y, name, value, id, type }: BlockControllerProps) => {
  let block = null;

  if (name === 'start') {
    block = blockStart({ id });
  } else if (name === 'output') {
    block = blockOutput({ id });
  } else if (name === 'value') {
    block = blockValue({ id });
  } else {
    block = document.createElement('li');
  }

  if (type === 'declare') {
    block.setAttribute('class', 'block block--declare');
  } else if (type === 'general') {
    block.setAttribute('class', 'block block--general');
  } else if (type === 'control') {
    block.setAttribute('class', 'block block--control');
  } else if (type === 'expressionValue') {
    block.setAttribute('class', 'block block--expression-value');
  } else if (type === 'expressionLogical') {
    block.setAttribute('class', 'block block--expression-logical');
  }

  block.setAttribute('style', `left: ${x}px; top: ${y}px`);

  return block;
};
