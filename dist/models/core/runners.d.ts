import { ModifierParams, RunConfig } from "../types/common";
import { Applier, Modifier } from "../types/core";
export type BuildModifiersSequentially<A extends Readonly<Applier[]>, M extends Readonly<Modifier[]>> = {
    [K in M[number] as K["name"]]: ((...item: ModifierParams<K>) => BuildModifiersSequentially<A, M>) & BuildModifiersSequentially<A, M>;
} & {
    run: (...items: Parameters<A[number]["apply"]>) => SequentialBuilder<A, M>;
};
export type SequentialBuilder<A extends Readonly<Applier[]>, M extends Readonly<Modifier[]>> = {
    [K in A[number] as `apply${Capitalize<K["name"]>}`]: ((...items: Parameters<K["apply"]>) => SequentialBuilder<A, M>) & BuildModifiersSequentially<A, M>;
};
export type BuildModifiersDirectly<A extends Readonly<Applier[]>, M extends Readonly<Modifier[]>> = {
    [K in M[number] as K["name"]]: ((...items: ModifierParams<K>) => DirectBuilder<A, M>) & BuildModifiersDirectly<A, M>;
};
export type DirectBuilder<A extends Readonly<Applier[]>, M extends Readonly<Modifier[]>> = {
    [K in A[number] as `apply${Capitalize<K["name"]>}`]: ((...items: Parameters<K["apply"]>) => DirectBuilder<A, M>) & BuildModifiersDirectly<A, M>;
};
export declare const getRunners: <A extends readonly Applier[], M extends readonly Modifier[]>(_: A, __: M) => [{
    readonly name: "sequential";
    readonly build: ({ helpers: { getCommonBuilder } }: {
        runConfig: RunConfig;
        setRunConfig: (nextRunConfig: Partial<RunConfig>) => void;
        builder: any;
        helpers: Record<string, Function> & {
            getCommonBuilder: (options?: import("../helpers/create-common-builder").CommonBuilderProps) => any;
            createApplierConfig: import("../../lib/common").CreateApplierConfig;
            createModifierConfig: import("../../lib/common").CreateModifierConfig;
        };
    }) => SequentialBuilder<A, M>;
}, {
    readonly name: "direct";
    readonly build: ({ helpers: { getCommonBuilder } }: {
        runConfig: RunConfig;
        setRunConfig: (nextRunConfig: Partial<RunConfig>) => void;
        builder: any;
        helpers: Record<string, Function> & {
            getCommonBuilder: (options?: import("../helpers/create-common-builder").CommonBuilderProps) => any;
            createApplierConfig: import("../../lib/common").CreateApplierConfig;
            createModifierConfig: import("../../lib/common").CreateModifierConfig;
        };
    }) => DirectBuilder<A, M>;
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