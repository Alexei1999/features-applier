import { core } from "../core/index";
import { BuildMethodsConfig, FeaturesApplier, FeaturesApplierPlugin, FeaturesBuilder } from "../types/common";
import { Applier, FeatureApplierOptions, Modifier, Runner } from "../types/core";
export type FeaturesApplierBuildUtils = {
    getDefaults: () => typeof core;
};
export type FeaturesApplierBuildFlow<U extends BuildMethodsConfig = {}, R extends Runner[] = [], A extends Applier[] = [], M extends Modifier[] = [], H extends Record<string, (...args: any) => unknown> = {}> = {
    _runners: R;
    _appliers: A;
    _modifiers: M;
    _helpers: H;
    addHelpers: <P extends Record<string, (this: FeaturesApplierBuildFlow<U, R, A, M, H>, ...args: any) => unknown>>(helpers: P) => FeaturesApplierBuildFlow<U, R, A, M, H & P>;
    addModifiers: <P extends Modifier[]>(this: FeaturesApplierBuildFlow<U, R, A, M, H>, ...modifiers: P) => FeaturesApplierBuildFlow<U, R, A, [...M, ...P], H>;
    addAppliers: <P extends Applier[]>(this: FeaturesApplierBuildFlow<U, R, A, M, H>, ...appliers: P) => FeaturesApplierBuildFlow<U, R, [...A, ...P], M, H>;
    addPlugin: <PA extends Applier[] = [], PM extends Modifier[] = [], PH extends Record<string, (...args: any) => unknown> = {}>(this: FeaturesApplierBuildFlow<U, R, A, M, H>, plugin: FeaturesApplierPlugin<PA, PM, PH>) => FeaturesApplierBuildFlow<U, R, [...A, ...PA], [...M, ...PM], H & PH>;
    createRunners: <P extends Runner[]>(this: FeaturesApplierBuildFlow<U, R, A, M, H>, crFn: (appliers: A, modifiers: M, buildMethods: U) => P) => FeaturesApplierBuildFlow<U, [...R, ...P], A, M, H>;
    finish: <DR extends R[number]["name"] = R[0]["name"]>(options?: Omit<FeatureApplierOptions, "defaultRunner"> & {
        defaultRunner?: DR;
    }) => {
        applyFeatures: FeaturesApplier<R, DR, H>;
        buildFeatures: FeaturesBuilder<R, DR, H>;
    };
};
export type InitFeatureApplierBuilder = <U extends BuildMethodsConfig = {}>(params?: {
    buildMethods: U;
}) => FeaturesApplierBuildFlow<U>;
export type FeatureApplierBuilder = InitFeatureApplierBuilder & FeaturesApplierBuildUtils;
export declare const buildFeaturesApplier: FeatureApplierBuilder;
//# sourceMappingURL=build-features-applier.d.ts.map