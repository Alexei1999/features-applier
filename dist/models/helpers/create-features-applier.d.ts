import { Applier, FeatureApplierBuilderOptions, Modifier, Runner } from "../types/core";
import { FeaturesApplier } from "../types/common";
export type CreateFeatureApplierProps = FeatureApplierBuilderOptions & {
    runners: Runner[];
    appliers: Applier[];
    modifiers: Modifier[];
    helpers: Record<string, (...args: any) => unknown>;
};
export declare const createFeaturesApplier: ({ appliers, modifiers, helpers, runners, defaultRunner: outerDefaultRunner, processBuild, }: CreateFeatureApplierProps) => FeaturesApplier<Runner[], string, Record<string, (...args: any) => unknown>>;
//# sourceMappingURL=create-features-applier.d.ts.map