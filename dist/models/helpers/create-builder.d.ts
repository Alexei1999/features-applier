import { RunConfig } from "../types/common";
import { FeatureApplierCreateBuilderOptions } from "../types/core";
import { CreateFeatureApplierProps } from "./create-features-applier";
export declare const getBuilder: ({ appliers, modifiers, runners, defaultRunner, buildMethods, }: FeatureApplierCreateBuilderOptions & CreateFeatureApplierProps) => {
    readonly builder: any;
    readonly runsConfig: RunConfig[];
};
//# sourceMappingURL=create-builder.d.ts.map