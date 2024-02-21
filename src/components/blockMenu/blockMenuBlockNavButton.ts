import { createBlock } from '../../classes/blockFactory/createBlock';

interface BlockMenuBlockNavButtonProps {
  name: string;
  type: string;
  x: number;
  y: number;
}

export const blockMenuBlockNavButton = ({ name, type, x, y }: BlockMenuBlockNavButtonProps) => {
  const newBlock = createBlock(name, '', x, y);

  const { block } = newBlock.getElement(newBlock.data.id, newBlock.data.x, newBlock.data.y);

  block.draggable = true;
  block.addEventListener('dragstart', function (event: DragEvent) {
    if (event.dataTransfer) {
      event.dataTransfer.setData('name', name);
      event.dataTransfer.setData('type', type);
      event.dataTransfer.setData('offsetX', event.offsetX.toString());
      event.dataTransfer.setData('offsetY', event.offsetY.toString());
    }
  });

  return block;
};
