import { useState } from '../core/core';
import { BLOCK_OBJECT } from '../constants/blockObject';
import { BLOCK_TYPE_OBJECT } from '../constants/blockTypeObject';
import { createElementCommon } from '../utils/createElementCommon';

export const blockMenu = () => {
  const [getSelectedType, setSelectedType] = useState(0);

  const blockMenuDiv = createElementCommon('div', { id: 'block-menu' });

  const blockTypeNav = createElementCommon('nav', {});
  BLOCK_TYPE_OBJECT.forEach((blockType) => {
    const button = createElementCommon('button', { textContent: blockType.korName, className: 'bg-lightgray' });
    blockTypeNav.appendChild(button);
  });

  const blockNav = createElementCommon('nav', {});
  BLOCK_OBJECT.filter((block) => block.type === BLOCK_TYPE_OBJECT[getSelectedType()].name).forEach((block) => {
    const button = createElementCommon('button', { textContent: block.korName, className: 'bg-yellow' });
    blockNav.appendChild(button);
  });

  blockMenuDiv.appendChild(blockTypeNav);
  blockMenuDiv.appendChild(blockNav);

  return blockMenuDiv;
};
