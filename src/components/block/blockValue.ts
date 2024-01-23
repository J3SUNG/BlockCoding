import { camelToKebab } from '../../utils/camelToKebab';
import { BlockCommonProps } from '../../types/blockCommonProps';
import { createElementCommon } from '../../utils/createElementCommon';
import { BlockObject, BlockObjectValue } from '../../types/blockObject';

interface OnUpdateValueBlockProps {
  targetUniqueId: string;
  obj: BlockObjectValue;
}

export const blockValue = ({ id, x, y, type, value, workspaceData, updateWorkspaceData }: BlockCommonProps) => {
  const div = createElementCommon('div', { id, className: `block block--${camelToKebab({ str: type })}` });
  const input = createElementCommon('input', {
    className: 'block__input',
    value: value ? value : '10',
    readonly: value ? 'false' : 'true',
  });

  if (!value) {
    input.setAttribute('readonly', 'true');
  }

  input.addEventListener('blur', (e: FocusEvent) => {
    const target = e.target as HTMLInputElement;
    const { value } = target;

    const div = target.closest('div');

    if (updateWorkspaceData && workspaceData) {
      const blockValueTarget = onUpdateValueBlock({
        targetUniqueId: div?.id ?? '',
        obj: workspaceData,
      });

      if (blockValueTarget) {
        blockValueTarget.data.value = value;
        updateWorkspaceData([...workspaceData]);
      }
    }
  });

  div.setAttribute('style', `left: ${x}px; top: ${y}px`);
  div.appendChild(input);

  return div;
};

const onUpdateValueBlock = ({ targetUniqueId, obj }: OnUpdateValueBlockProps): BlockObject | null => {
  if (!obj || (typeof obj === 'object' && Object.keys(obj).length === 0)) {
    return null;
  }

  if (Array.isArray(obj)) {
    for (const block of obj) {
      const result: BlockObject | null = onUpdateValueBlock({ targetUniqueId, obj: block });
      if (result) return result; // 매칭되는 객체를 찾으면 반환하고 루프 중단
    }
  } else if (typeof obj === 'object' && obj !== null) {
    if (obj.data.id === targetUniqueId) {
      return obj;
    } else {
      return onUpdateValueBlock({ targetUniqueId, obj: obj.data.value });
    }
  }

  return null;
};
