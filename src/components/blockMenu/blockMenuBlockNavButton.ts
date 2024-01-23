import { blockController } from '../../utils/blockController';

interface BlockMenuBlockNavButtonProps {
  name: string;
  type: string;
  x: number;
  y: number;
}

export const blockMenuBlockNavButton = ({ name, type, x, y }: BlockMenuBlockNavButtonProps) => {
  const div = blockController({ id: '', x, y, type, name });

  div.draggable = true;
  div.addEventListener('dragstart', function (event: DragEvent) {
    event.dataTransfer?.setData('name', name);
    event.dataTransfer?.setData('type', type);
    event.dataTransfer?.setData('offsetX', event.offsetX.toString());
    event.dataTransfer?.setData('offsetY', event.offsetY.toString());
  });

  return div;
};
