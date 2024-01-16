import { BlockMenuBlockNavProps } from '../../types/blockMenu';
import { BLOCK_MAP } from '../../constants/blockMap';
import { BLOCK_OBJECT } from '../../constants/blockObject';
import { BLOCK_TYPE_OBJECT } from '../../constants/blockTypeObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { blockController } from '../block/blockController';

export const blockMenuBlockNav = ({
  selectedType,
  setSelectedTypeBlock,
  selectedMenuBlock,
  setSelectedMenuBlock,
  setBlockList,
  blockList,
  uniqueId,
  setUniqueId,
}: BlockMenuBlockNavProps) => {
  const BlockNav = createElementCommon('nav', { id: 'block-menu__nav-block' });
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');

  const blockListG = document.createElementNS('http://www.w3.org/2000/svg', 'g');

  BLOCK_OBJECT.filter((block) => block.type === BLOCK_TYPE_OBJECT[selectedType].name).forEach((block, index) => {
    const blockG = blockController({
      x: 40,
      y: 10,
      width: 200,
      height: 50,
      name: block.name,
      value: block.name === 'value' ? block.data.value.toString() : undefined,
      id: block.data.id!,
    });

    blockG!.addEventListener('click', (e) => {
      setSelectedTypeBlock(index);
      const name = block.name;

      const blockIndex = BLOCK_MAP[name];
      if (selectedMenuBlock === blockIndex) {
        setSelectedMenuBlock(-1);
        setSelectedTypeBlock(-1);
        console.log(BLOCK_OBJECT[blockIndex]);

        const deepCopiedObj = JSON.parse(JSON.stringify(BLOCK_OBJECT[blockIndex]));
        deepCopiedObj.data.id = 'unique-id__' + uniqueId;
        setUniqueId(uniqueId + 1);

        setBlockList([...blockList, { ...deepCopiedObj }]);
      } else {
        setSelectedMenuBlock(blockIndex);
      }
    });
    blockListG.appendChild(blockG!);
  });

  svg.appendChild(blockListG);
  BlockNav.appendChild(svg);

  return BlockNav;
};
