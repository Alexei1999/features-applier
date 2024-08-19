import { BuildMethods, BuildMethodsConfig, ModifierParams, RunConfig } from "../types/common";
import { Applier, Modifier } from "../types/core";
export type BuildModifiersSequentially<A extends Readonly<Applier[]>, M extends Readonly<Modifier[]>, U extends BuildMethodsConfig> = {
    [K in M[number] as K["name"]]: ((...item: ModifierParams<K>) => BuildModifiersSequentially<A, M, U>) & BuildModifiersSequentially<A, M, U>;
} & {
    run: (...items: Parameters<A[number]["apply"]>) => SequentialBuilder<A, M, U>;
};
export type SequentialBuilder<A extends Readonly<Applier[]>, M extends Readonly<Modifier[]>, U extends BuildMethodsConfig> = {
    [K in A[number] as `apply${Capitalize<K["name"]>}`]: ((...items: Parameters<K["apply"]>) => SequentialBuilder<A, M, U>) & BuildModifiersSequentially<A, M, U>;
} & BuildMethods<U, {
    builder: SequentialBuilder<A, M, U>;
}>;
export type BuildModifiersDirectly<A extends Readonly<Applier[]>, M extends Readonly<Modifier[]>, U extends BuildMethodsConfig> = {
    [K in M[number] as K["name"]]: ((...items: ModifierParams<K>) => DirectBuilder<A, M, U>) & BuildModifiersDirectly<A, M, U>;
};
export type DirectBuilder<A extends Readonly<Applier[]>, M extends Readonly<Modifier[]>, U extends BuildMethodsConfig> = {
    [K in A[number] as `apply${Capitalize<K["name"]>}`]: ((...items: Parameters<K["apply"]>) => DirectBuilder<A, M, U>) & BuildModifiersDirectly<A, M, U>;
} & BuildMethods<U, {
    builder: DirectBuilder<A, M, U>;
}>;
export declare const getRunners: <A extends readonly Applier[], M extends readonly Modifier[], U extends BuildMethodsConfig>(_: A, __: M, ___: U) => [{
    readonly name: "sequential";
    readonly build: ({ helpers: { getCommonBuilder } }: {
        runConfig: RunConfig;
        setRunConfig: (nextRunConfig: Partial<RunConfig>) => void;
        builder: any;
        helpers: Record<string, (...args: any[]) => unknown> & {
            getCommonBuilder: (options?: import("../helpers/create-common-builder").CommonBuilderProps) => any;
            createApplierConfig: import("../../lib/common").CreateApplierConfig;
            createModifierConfig: import("../../lib/common").CreateModifierConfig;
        };
    }) => SequentialBuilder<A, M, U>;
}, {
    readonly name: "direct";
    readonly build: ({ helpers: { getCommonBuilder } }: {
        runConfig: RunConfig;
        setRunConfig: (nextRunConfig: Partial<RunConfig>) => void;
        builder: any;
        helpers: Record<string, (...args: any[]) => unknown> & {
            getCommonBuilder: (options?: import("../helpers/create-common-builder").CommonBuilderProps) => any;
            createApplierConfig: import("../../lib/common").CreateApplierConfig;
            createModifierConfig: import("../../lib/common").CreateModifierConfig;
        };
    }) => DirectBuilder<A, M, U>;
    readonly editRunConfig: (runConfig: RunConfig) => {
        appliers: {
            args: any;
            modifiers: any[];
            item: Applier;
        }[];
        runner: import("../types/core").Runner;
    };
}];
//# sourceMappingURL=runners.d.ts.map