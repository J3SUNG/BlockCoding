import { BlockPaintProps } from '../../types/blockPaintProps';
import { blockStart } from './blockStart';
import { blockOutput } from './blockOutput';
import { blockValue } from './blockValue';

interface BlockControllerProps extends BlockPaintProps {
  value?: string;
  type: string;
  name: string;
}

export const blockController = ({ x, y, name, value, id, type }: BlockControllerProps) => {
  let block = null;

  if (name === 'start') {
    block = blockStart({ x, y, id });
  } else if (name === 'output') {
    block = blockOutput({ x, y, id });
  } else if (name === 'value') {
    block = blockValue({ x, y, value, id });
  } else {
    block = document.createElement('li');
  }

  console.log(x, y);

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
