export const pick = (obj: any, keys: string[]): any => {
  const r = {};
  keys.forEach((key) => {
    r[key] = obj[key];
  });
  return r;
};
