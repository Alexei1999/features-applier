import { FeaturesBuilder } from "../types/common";
import { FeatureApplierBuilderOptions, Runner } from "../types/core";

import { getBuilder } from "./create-builder";
import { CreateFeatureApplierProps } from "./create-features-applier";

export const createFeaturesBuilder = ({
  appliers,
  modifiers,
  helpers,
  runners,
  defaultRunner: outerDefaultRunner,
  buildMethods,
}: FeatureApplierBuilderOptions & CreateFeatureApplierProps): FeaturesBuilder<
  Runner[],
  string,
  Record<string, (...args: any) => unknown>
> => {
  const defaultRunner = outerDefaultRunner ?? runners[0].name;

  return function featuresApplier(featuresCallback) {
    const { builder, runsConfig } = getBuilder({
      appliers,
      defaultRunner,
      helpers,
      modifiers,
      runners,
      buildMethods,
    });

    featuresCallback(builder, helpers);

    return runsConfig;
  };
};
