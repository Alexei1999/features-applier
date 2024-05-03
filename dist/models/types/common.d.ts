import React from "react";
import { Modifier, Runner, Applier } from "./core";
export type ModifierRunContext = Record<string, string | boolean | number>;
export type ModifierRunOptions = {
    context: ModifierRunContext;
    applier: RunConfig["appliers"][number];
};
export type ModifierParams<T extends Modifier> = T["pickProps"] extends (...args: any[]) => unknown ? Parameters<Exclude<T["pickProps"], undefined>> : [];
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
export type CreateRunners = <A extends Applier[] = any[], M extends Modifier[] = any[]>(appliers: A, modifiers: M) => Runner[];
export type FeaturesApplierPlugin<A extends Applier[] = Applier[], M extends Modifier[] = Modifier[], H extends Record<string, (...args: any) => unknown> = Record<string, (...args: any) => unknown>> = {
    appliers: A;
    modifiers: M;
    helpers: H;
};
export type Builder<R extends Readonly<Runner[]> = any[], DR extends Runner = any, U = Record<string, Function>> = U & ReturnType<DR["build"]> & (<T extends R[number]["name"]>(runner: T) => ReturnType<Extract<R[number], {
    name: T;
}>["build"]>);
export declare type FeaturesApplier<R extends Readonly<Runner[]>, DR extends R[number]["name"] | string, H> = <NP = undefined, CP = undefined>(featuresCallback: (builder: Builder<R, Extract<R[number], {
    name: DR;
}>>, helpers: H) => void) => <P>(component: React.ComponentType<P>) => React.ComponentType<CP extends undefined ? {
    [K in keyof P as K extends keyof NP ? never : K]: P[K];
} & (NP extends undefined ? never : {
    [K in keyof NP as NP[K] extends never ? never : K]: NP[K];
}) : CP>;
//# sourceMappingURL=common.d.ts.map