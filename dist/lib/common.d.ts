import { RunApplierConfig, RunModifierConfig } from "src/models/types/common";
import { Applier, Modifier } from "src/models/types/core";
/**
 * Builder is an proxy, should be always the first argument of mergeWithDescriptors
 */
export declare const mergeWithDescriptors: <T extends {}, S extends {}[]>(target: T, ...sources: S) => T;
export declare const mergeToProxy: <T extends {}, S extends {}>(proxy: T, source: S) => S;
export declare const capitalize: (str?: string, lowerRest?: boolean) => string;
export type CreateApplierConfig = (item: Applier, options: {
    params?: Parameters<Applier["apply"]>;
    modifiers?: RunModifierConfig[];
}) => RunApplierConfig;
export declare const createApplierConfig: CreateApplierConfig;
export type CreateModifierConfig = (item: Modifier, options: {
    parameters?: Parameters<Modifier["apply"]>;
}) => RunModifierConfig;
export declare const createModifierConfig: CreateModifierConfig;
//# sourceMappingURL=common.d.ts.map