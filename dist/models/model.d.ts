import React from "react";
import { CommonBuilderProps } from "../lib/create-common-builder";
export type Applier<T extends any[] = any[]> = {
    name: string;
    apply: (...items: T) => (component: React.ComponentType) => React.ComponentType<any>;
};
export type ModifierRunContext = Record<string, string | boolean | number>;
export type ModifierRunOptions = {
    context: ModifierRunContext;
    applier: RunConfig["appliers"][number];
};
export type Modifier<T extends any[] = any[]> = {
    name: string;
    priority?: number;
    pickProps?: (...props: any[]) => {
        modifierProps?: T;
        nextProps: any[];
    };
    apply: (...props: T) => (options: ModifierRunOptions, setContext: (nextContext: Partial<ModifierRunContext>) => void) => (component: React.ComponentType, originComponent: React.ComponentType) => React.ComponentType<any>;
};
export type ModifierParams<T extends Modifier> = T["pickProps"] extends (...args: any[]) => unknown ? Parameters<Exclude<T["pickProps"], undefined>> : [];
export type Runner<T = any> = {
    readonly name: string;
    build: (options: {
        runConfig: RunConfig;
        setRunConfig: (nextRunConfig: Partial<RunConfig>) => void;
        builder: Builder;
        helpers: Record<string, Function> & {
            getCommonBuilder: (options?: CommonBuilderProps) => any;
        };
    }) => T;
    editRunConfig?: (runConfig: RunConfig) => RunConfig;
};
export type RunConfig<R extends Runner = Runner, A extends Applier = Applier, T extends any[] = any[]> = {
    runner: R;
    appliers: {
        item: A;
        args: any[];
        modifiers: {
            item: Modifier<T>;
            args: any[];
        }[];
    }[];
};
export type CreateRunners = <A extends Readonly<Applier[]> = any[], M extends Readonly<Modifier[]> = any[]>(appliers: A, modifiers: M) => Readonly<Runner[]>;
export type FeatureApplierCore = {
    appliers: Readonly<Applier[]>;
    helpers: Record<string, (...args: any) => unknown>;
    modifiers: Readonly<Modifier[]>;
    getRunners: CreateRunners;
};
export type Builder<R extends Readonly<Runner[]> = any[], DR extends Runner = any, U = Record<string, Function>> = U & ReturnType<DR["build"]> & (<T extends R[number]["name"]>(runner: T) => ReturnType<Extract<R[number], {
    name: T;
}>["build"]>);
export declare type FeaturesApplier<R extends Readonly<Runner[]>, DR extends R[number]["name"] | string, H> = <EP, CP = unknown>(featuresCallback: (builder: Builder<R, Extract<R[number], {
    name: DR;
}>>, helpers: H) => void) => <P>(component: React.ComponentType<P>) => React.ComponentType<(CP extends {} ? CP : {
    [K in keyof P as K extends keyof EP ? never : K]: P[K];
}) & {
    [K in keyof EP as EP[K] extends never ? never : K]: EP[K];
}>;
//# sourceMappingURL=model.d.ts.map