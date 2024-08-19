import React from "react";

import { pipeline } from "../../lib/pipeline";
import {
  BuildMethodsConfig,
  FeaturesApplier,
  ModifierRunContext,
  ModifierRunOptions,
  RunConfig,
} from "../types/common";
import {
  Applier,
  FeatureApplierOptions,
  Modifier,
  Runner,
} from "../types/core";

import { getBuilder } from "./create-builder";
import { defaultProcessRun } from "./default-process-run";

export type CreateFeatureApplierProps = {
  runners: Runner[];
  appliers: Applier[];
  modifiers: Modifier[];
  helpers: Record<string, (...args: any) => unknown>;
  buildMethods: BuildMethodsConfig;
};

export const createFeaturesApplier = ({
  appliers,
  modifiers,
  helpers,
  runners,
  defaultRunner: outerDefaultRunner,
  processBuild = defaultProcessRun,
  buildMethods,
}: FeatureApplierOptions & CreateFeatureApplierProps): FeaturesApplier<
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

    const processedRunsConfig: RunConfig["appliers"] = (
      processBuild?.(runsConfig) ?? runsConfig
    )
      .map(
        (runConfig: RunConfig) =>
          runConfig.runner.editRunConfig?.(runConfig) ?? runConfig
      )
      .flatMap((runConfig: RunConfig) => runConfig.appliers);

    return pipeline(
      ...processedRunsConfig.map((applier) => {
        const context: ModifierRunContext = {};
        const options: ModifierRunOptions = {
          context,
          applier,
        };
        const setModifierContext = (
          nextContext: Partial<ModifierRunContext>
        ) => {
          options.context = {
            ...options.context,
            ...nextContext,
          } as ModifierRunContext;
        };

        return (originElement: React.ComponentType<any>) =>
          pipeline(
            applier.item.apply(...applier.args),
            ...applier.modifiers.map(
              ({ item, args }) =>
                (element: React.ComponentType<any>) =>
                  item.apply?.(...args)(options, setModifierContext)(
                    element,
                    originElement
                  ) ?? element
            )
          )(originElement);
      })
    );
  };
};
