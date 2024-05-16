import { core } from "../core/index";
import { FeaturesApplier, FeaturesApplierPlugin } from "../types/common";
import { Applier, FeatureApplierBuilderOptions, Modifier, Runner } from "../types/core";
export type FeaturesApplierBuilderUtils = {
    getDefaults: () => typeof core;
};
export type FeaturesApplierBuilder<R extends Runner[] = [], A extends Applier[] = [], M extends Modifier[] = [], H extends Record<string, (...args: any) => unknown> = {}> = {
    _runners: R;
    _appliers: A;
    _modifiers: M;
    _helpers: H;
    addHelpers: <P extends Record<string, (this: FeaturesApplierBuilder<R, A, M, H>, ...args: any) => unknown>>(helpers: P) => FeaturesApplierBuilder<R, A, M, H & P>;
    addModifiers: <P extends Modifier[]>(this: FeaturesApplierBuilder<R, A, M, H>, ...modifiers: P) => FeaturesApplierBuilder<R, A, [...M, ...P], H>;
    addAppliers: <P extends Applier[]>(this: FeaturesApplierBuilder<R, A, M, H>, ...appliers: P) => FeaturesApplierBuilder<R, [...A, ...P], M, H>;
    addPlugin: <PA extends Applier[] = [], PM extends Modifier[] = [], PH extends Record<string, (...args: any) => unknown> = {}>(this: FeaturesApplierBuilder<R, A, M, H>, plugin: FeaturesApplierPlugin<PA, PM, PH>) => FeaturesApplierBuilder<R, [...A, ...PA], [...M, ...PM], H & PH>;
    createRunners: <P extends Runner[]>(this: FeaturesApplierBuilder<R, A, M, H>, crFn: (appliers: A, modifiers: M) => P) => FeaturesApplierBuilder<[...R, ...P], A, M, H>;
    finish: <DR extends R[number]["name"] = R[0]["name"]>(options?: Omit<FeatureApplierBuilderOptions, "defaultRunner"> & {
        defaultRunner?: DR;
    }) => FeaturesApplier<R, DR, H>;
};
export type InitFeatureApplierBuilder = (() => FeaturesApplierBuilder) & FeaturesApplierBuilderUtils;
export declare const buildFeaturesApplier: InitFeatureApplierBuilder;
//# sourceMappingURL=build-features-applier.d.ts.map