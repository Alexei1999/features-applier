import { ExtractBuildMethodsParams } from "../models/helpers/create-common-builder";
import { RunApplierConfig, RunModifierConfig } from "../models/types/common";
import { Applier, Modifier } from "../models/types/core";
/**
 * As `builder` is an proxy, is should be always the first argument of assignObjectDescriptors
 */
export declare const assignObjectDescriptors: <T extends {}, S extends {}[]>(target: T, ...sources: S) => T;
export declare const assignToProxy: <T extends {}, S extends {}>(proxy: T, source: S) => {};
export declare const capitalize: (str?: string, lowerRest?: boolean) => string;
export type CreateApplierConfig = (item: Applier, options: {
    params?: Parameters<Applier["apply"]>;
    modifiers?: RunModifierConfig[];
}) => RunApplierConfig;
export declare const createApplierConfig: CreateApplierConfig;
export type CreateModifierConfig = (item: Modifier, options: {
    parameters?: Modifier["apply"] extends undefined ? undefined : Parameters<Exclude<Modifier["apply"], undefined>>;
}) => RunModifierConfig;
export declare const createModifierConfig: CreateModifierConfig;
export declare const extractBuildMethods: ({ buildMethods, runsConfig, setRunsConfig, builder, ...props }: ExtractBuildMethodsParams) => {
    [k: string]: (...args: any) => any;
};
//# sourceMappingURL=common.d.ts.map