import { Applier, Modifier, ModifierParams, RunConfig } from "../model";
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
export declare const getRunners: <A extends readonly Applier[], M extends readonly Modifier[]>() => readonly [{
    readonly name: "sequential";
    readonly build: ({ helpers: { getCommonBuilder } }: {
        runConfig: RunConfig<import("../model").Runner<any>, Applier<any[]>, any[]>;
        setRunConfig: (nextRunConfig: Partial<RunConfig<import("../model").Runner<any>, Applier<any[]>, any[]>>) => void;
        builder: any;
        helpers: Record<string, Function> & {
            getCommonBuilder: (options?: import("../../lib/create-common-builder").CommonBuilderProps) => any;
        };
    }) => SequentialBuilder<A, M>;
}, {
    readonly name: "direct";
    readonly build: ({ helpers: { getCommonBuilder } }: {
        runConfig: RunConfig<import("../model").Runner<any>, Applier<any[]>, any[]>;
        setRunConfig: (nextRunConfig: Partial<RunConfig<import("../model").Runner<any>, Applier<any[]>, any[]>>) => void;
        builder: any;
        helpers: Record<string, Function> & {
            getCommonBuilder: (options?: import("../../lib/create-common-builder").CommonBuilderProps) => any;
        };
    }) => DirectBuilder<A, M>;
    readonly editRunConfig: (runConfig: RunConfig<import("../model").Runner<any>, Applier<any[]>, any[]>) => {
        appliers: {
            args: any;
            modifiers: any[];
            item: Applier<any[]>;
        }[];
        runner: import("../model").Runner<any>;
    };
}];
//# sourceMappingURL=runners.d.ts.map