type ZipType = { [key: string]: string };

const ZIP_KEY_MAP: ZipType = {
  name: 'a$',
  type: 'b$',
  fold: 'c$',
  paramSize: 'd$',
  data: 'e$',
  id: 'f$',
  x: 'g$',
  y: 'h$',
  value: 'i$',
  varName: 'j$',
  funcName: 'k$',
  condition: 'l$',
  operator: 'm$',
  secondValue: 'n$',
  param1: 'v$',
  param2: 'w$',
  param3: 'x$',
  param4: 'y$',
  width: 'z$',
  childWidth: '1$',
  spaceWidth: '2$',
};

const ZIP_NAME_MAP: ZipType = {
  start: 'a^',
  function: 'b^',
  functionCall: 'c^',
  functionReturn: 'd^',
  variable: 'e^',
  output: 'f^',
  timer: 'g^',
  condition: 'h^',
  loop: 'i^',
  value: 'j^',
  input: 'k^',
  refVariable: 'l^',
  arithmetic: 'm^',
  comparison: 'n^',
  negation: 'v^',
  logical: 'w^',
  string: 'x^',
  randomNumber: 'y^',
  debug: 'z^',
};

const ZIP_TYPE_MAP: ZipType = {
  declare: 'a@',
  general: 'b@',
  control: 'c@',
  expressionValue: 'd@',
  expressionLogical: 'e@',
};

const UNZIP_KEY_MAP = Object.fromEntries(Object.entries(ZIP_KEY_MAP).map(([k, v]) => [v, k]));
const UNZIP_NAME_MAP = Object.fromEntries(Object.entries(ZIP_NAME_MAP).map(([k, v]) => [v, k]));
const UNZIP_TYPE_MAP = Object.fromEntries(Object.entries(ZIP_TYPE_MAP).map(([k, v]) => [v, k]));

export const zip = (item: any): any => {
  if (Array.isArray(item)) {
    return item.map(zip);
  } else if (item !== null && typeof item === 'object') {
    const entries = Object.entries(item).map(([key, value]) => {
      const mappedKey = ZIP_KEY_MAP[key] || key;

      if (key === 'id') {
        return [mappedKey, ''];
      } else if (key === 'name' && typeof value === 'string' && ZIP_NAME_MAP[value]) {
        return [mappedKey, ZIP_NAME_MAP[value]];
      } else if (key === 'type' && typeof value === 'string' && ZIP_TYPE_MAP[value]) {
        return [mappedKey, ZIP_TYPE_MAP[value]];
      } else {
        return [mappedKey, zip(value)];
      }
    });

    return Object.fromEntries(entries);
  }
  return item;
};

export const unzip = (item: any): any => {
  if (Array.isArray(item)) {
    return item.map(unzip);
  } else if (item !== null && typeof item === 'object') {
    const entries = Object.entries(item).map(([key, value]) => {
      const originalKey = UNZIP_KEY_MAP[key] || key;
      let newValue;

      if (typeof value === 'string' && (originalKey === 'name' || originalKey === 'type')) {
        newValue = UNZIP_NAME_MAP[value] || UNZIP_TYPE_MAP[value] || value;
      } else {
        newValue = unzip(value);
      }

      return [originalKey, newValue];
    });

    return Object.fromEntries(entries);
  }
  return item;
};
