import { BuildMethodsConfig, FeaturesApplier } from "../types/common";
import { Applier, FeatureApplierOptions, Modifier, Runner } from "../types/core";
export type CreateFeatureApplierProps = {
    runners: Runner[];
    appliers: Applier[];
    modifiers: Modifier[];
    helpers: Record<string, (...args: any) => unknown>;
    buildMethods: BuildMethodsConfig;
};
export declare const createFeaturesApplier: ({ appliers, modifiers, helpers, runners, defaultRunner: outerDefaultRunner, processBuild, buildMethods, }: FeatureApplierOptions & CreateFeatureApplierProps) => FeaturesApplier<Runner[], string, Record<string, (...args: any) => unknown>>;
//# sourceMappingURL=create-features-applier.d.ts.map