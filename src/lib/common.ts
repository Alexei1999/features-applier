import {
  RunApplierConfig,
  RunModifierConfig,
} from "../models/types/common";
import { Applier, Modifier } from "../models/types/core";

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
export const mergeToProxy = <T extends {}, S extends {}>(
  proxy: T,
  source: S
) => {
  const aggregation = { ...source };

  return new Proxy(aggregation, {
    get(target, prop) {
      if (target.hasOwnProperty(prop)) {
        return target[prop];
      }

      return proxy[prop];
    },
  });
};

export const capitalize = (str: string = "", lowerRest = false): string =>
  str.slice(0, 1).toUpperCase() +
  (lowerRest ? str.slice(1).toLowerCase() : str.slice(1));

export type CreateApplierConfig = (
  item: Applier,
  options: {
    params?: Parameters<Applier["apply"]>;
    modifiers?: RunModifierConfig[];
  }
) => RunApplierConfig;
export const createApplierConfig: CreateApplierConfig = (
  item,
  { params = [], modifiers = [] }
): RunApplierConfig => ({
  args: params,
  modifiers,
  item,
});

export type CreateModifierConfig = (
  item: Modifier,
  options: {
    parameters?: Parameters<Modifier["apply"]>;
  }
) => RunModifierConfig;
export const createModifierConfig: CreateModifierConfig = (
  item: Modifier,
  { parameters }
): RunModifierConfig => ({
  item,
  args: parameters,
});
