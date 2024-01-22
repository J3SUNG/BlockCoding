export const createElementCommon = (tagName: string, props: { [key: string]: string | undefined }) => {
  const element = document.createElement(tagName);

  for (const prop in props) {
    (element as any)[prop] = props[prop];
  }

  return element;
};
