import { BlockInputProps } from '../../types/blockInputObj';

export const blockInput = ({ x, y, value, isView, setBlockValue, setBlockInputObj }: BlockInputProps) => {
  const input = document.createElement('input');
  if (isView) {
    const valueWidth = value!.length * 18 < 60 ? 60 : value!.length * 18;
    input.setAttribute('type', 'text');
    input.setAttribute('value', value!);
    input.setAttribute(
      'style',
      `left: ${x! + 30}px; top: ${y! + 11}px; width: ${valueWidth - 20}px;,
      }}`,
    );
    input.setAttribute('id', 'block-input');
    input.setAttribute('autofocus', 'true');
    input.addEventListener('blur', (e) => {
      const target = e.target as HTMLInputElement;
      setBlockValue!(target.value);
      setBlockInputObj({ x, y, value: target.value, isView: false, setBlockValue });
    });
  }

  return input;
};
