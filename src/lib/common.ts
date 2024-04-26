import { CreateRunners } from "../models/model";

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

export type MergeRunners<T1 extends CreateRunners, T2 extends CreateRunners> = [
  ...ReturnType<T1>,
  ...ReturnType<T2>
];

export const capitalize = (str: string = "", lowerRest = false): string =>
  str.slice(0, 1).toUpperCase() +
  (lowerRest ? str.slice(1).toLowerCase() : str.slice(1));
