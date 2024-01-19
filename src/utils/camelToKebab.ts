interface CamelToKebabProps {
  str: string;
}

export const camelToKebab = ({ str }: CamelToKebabProps) => {
  return str
    .split('')
    .map((char, index) => {
      if (char === char.toUpperCase() && char !== char.toLowerCase()) {
        return (index !== 0 ? '-' : '') + char.toLowerCase();
      }
      return char;
    })
    .join('');
};
