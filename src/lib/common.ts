/**
 * Builder is an proxy, should be always the first argument of mergeWithDescriptors
 */
export const mergeWithDescriptors = <T extends {}, S extends {}[]>(
  target: T,
  ...sources: S
) => {
  sources.forEach((source) => {
    Object.getOwnPropertyNames(source).forEach((key) => {
      const descriptor = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, descriptor!);
    });
  });

  return target;
};

export const capitalize = (str: string = "", lowerRest = false): string =>
  str.slice(0, 1).toUpperCase() +
  (lowerRest ? str.slice(1).toLowerCase() : str.slice(1));
