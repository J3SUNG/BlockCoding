export const createUniqueId = () => {
  return 'uid_' + Math.random().toString(36).substring(2, 12);
};
