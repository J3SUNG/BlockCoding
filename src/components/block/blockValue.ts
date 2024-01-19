import { camelToKebab } from '../../utils/camelToKebab';
import { BlockCommonProps } from '../../types/blockCommonProps';
import { createElementCommon } from '../../utils/createElementCommon';
import { BlockObject } from '../../types/blockObject';

interface UpdateBlockValueProps {
  targetUniqueId: string;
  obj: BlockObject | BlockObject[] | string;
}

export const blockValue = ({ id, x, y, type, value, blockList, setBlockList }: BlockCommonProps) => {
  const div = createElementCommon('div', { id, className: `block block--${camelToKebab({ str: type })}` });
  const input = createElementCommon('input', { className: 'block__input', value });

  input.addEventListener('blur', (e: any) => {
    const target = e.target as HTMLInputElement;
    const { value } = target;

    const div = target.closest('div');

    if (setBlockList && blockList) {
      const blockValueTarget = updateBlockValue({
        targetUniqueId: div?.id ?? '',
        obj: blockList,
      });

      if (blockValueTarget) {
        blockValueTarget.data.value = value;
        setBlockList([...blockList]);
      }
    }
  });

  div.setAttribute('style', `left: ${x}px; top: ${y}px`);
  div.appendChild(input);

  return div;
};

const updateBlockValue = ({ targetUniqueId, obj }: UpdateBlockValueProps): BlockObject | null => {
  if (!obj || (typeof obj === 'object' && Object.keys(obj).length === 0)) {
    return null;
  }

  if (Array.isArray(obj)) {
    for (const block of obj) {
      const result: BlockObject | null = updateBlockValue({ targetUniqueId, obj: block });
      if (result) return result; // 매칭되는 객체를 찾으면 반환하고 루프 중단
    }
  } else if (typeof obj === 'object' && obj !== null) {
    if (obj.data.id === targetUniqueId) {
      return obj; // 매칭되는 객체 반환
    } else {
      return updateBlockValue({ targetUniqueId, obj: obj.data.value });
    }
  }

  return null;
};
