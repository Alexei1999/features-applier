import { core } from "src/models/core/index";
import { Applier, Modifier, Runner } from "src/models/types/core";
import { RunConfig, FeaturesApplierPlugin, FeaturesApplier } from "../types/common";
export type FeatureApplierBuilderOptions = {
    processBuild?: (runsConfig: RunConfig[]) => RunConfig[];
    defaultRunner?: string;
};
export type FeaturesApplierBuilder<R extends Runner[] = [], A extends Applier[] = [], M extends Modifier[] = [], H extends Record<string, (...args: any) => unknown> = {}> = {
    _runners: R;
    _appliers: A;
    _modifiers: M;
    _helpers: H;
    getDefaults: () => typeof core;
    addHelpers: <P extends Record<string, (...args: any) => unknown>>(helpers: P) => FeaturesApplierBuilder<R, A, M, H & P>;
    addModifiers: <P extends Modifier[]>(...modifiers: P) => FeaturesApplierBuilder<R, A, [...M, ...P], H>;
    addAppliers: <P extends Applier[]>(...appliers: P) => FeaturesApplierBuilder<R, [...A, ...P], M, H>;
    addPlugin: <PA extends Applier[] = [], PM extends Modifier[] = [], PH extends Record<string, (...args: any) => unknown> = {}>(plugin: FeaturesApplierPlugin<PA, PM, PH>) => FeaturesApplierBuilder<R, [...A, ...PA], [...M, ...PM], H & PH>;
    createRunners: <P extends Runner[]>(crFn: (appliers: A, modifiers: M) => P) => FeaturesApplierBuilder<[...R, ...P], A, M, H>;
    finish: <DR extends R[number]["name"] = R[0]["name"]>(options?: Omit<FeatureApplierBuilderOptions, "defaultRunner"> & {
        defaultRunner?: DR;
    }) => FeaturesApplier<R, DR, H>;
};
export declare const buildFeaturesApplier: FeaturesApplierBuilder<[], [], [], {}>;
//# sourceMappingURL=build-features-applier.d.ts.map