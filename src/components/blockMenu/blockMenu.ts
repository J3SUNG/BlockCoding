import { useState } from '../../core/core';
import { BLOCK_OBJECT } from '../../constants/blockObject';
import { BLOCK_TYPE_OBJECT } from '../../constants/blockTypeObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { blockMenuProps } from '../../types/blockMenuProps';
import { BLOCK_MAP } from '../../constants/blockMap';

export const blockMenu = ({ selectedBlock, setSelectedBlock, blockList, setBlockList }: blockMenuProps) => {
  const [selectedType, setSelectedType] = useState(0);
  const [selectedTypeBlock, setSelectedTypeBlock] = useState(-1);

  const blockMenuDiv = createElementCommon('div', { id: 'block-menu' });
  const blockTypeNav = createElementCommon('nav', {});

  BLOCK_TYPE_OBJECT.forEach((blockType, index) => {
    const button = createElementCommon('button', {
      textContent: blockType.korName,
      className: `${selectedType === index ? 'bg-yellow' : 'bg-lightgray'}`,
    });
    button.onclick = () => {
      setSelectedType(index);
      setSelectedTypeBlock(-1);
    };
    blockTypeNav.appendChild(button);
  });

  const BlockNav = createElementCommon('nav', {});
  BLOCK_OBJECT.filter((block) => block.type === BLOCK_TYPE_OBJECT[selectedType].name).forEach((block, index) => {
    const button = createElementCommon('button', {
      name: block.name,
      textContent: block.korName,
      className: `${selectedTypeBlock === index ? 'bg-yellow' : 'bg-lightgray'}`,
    });
    button.onclick = (e) => {
      setSelectedTypeBlock(index);
      const name = (e.target as HTMLButtonElement).name;
      const blockIndex = BLOCK_MAP[name];

      if (selectedBlock === blockIndex) {
        setSelectedBlock(-1);
        setSelectedTypeBlock(-1);
        setBlockList([...blockList, { ...BLOCK_OBJECT[blockIndex] }]);
      } else {
        setSelectedBlock(blockIndex);
      }
    };
    BlockNav.appendChild(button);
  });

  blockMenuDiv.appendChild(blockTypeNav);
  blockMenuDiv.appendChild(BlockNav);

  return blockMenuDiv;
};
