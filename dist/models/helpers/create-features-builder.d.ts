import { FeaturesBuilder } from "../types/common";
import { FeatureApplierBuilderOptions, Runner } from "../types/core";
import { CreateFeatureApplierProps } from "./create-features-applier";
export declare const createFeaturesBuilder: ({ appliers, modifiers, helpers, runners, defaultRunner: outerDefaultRunner, buildMethods, }: FeatureApplierBuilderOptions & CreateFeatureApplierProps) => FeaturesBuilder<Runner[], string, Record<string, (...args: any) => unknown>>;
//# sourceMappingURL=create-features-builder.d.ts.map