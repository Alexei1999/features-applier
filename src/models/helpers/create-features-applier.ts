import React from "react";

import {
  assignObjectDescriptors,
  createApplierConfig,
  createModifierConfig,
} from "../../lib/common";
import { pipeline } from "../../lib/pipeline";
import {
  Builder,
  FeaturesApplier,
  ModifierRunContext,
  ModifierRunOptions,
  RunConfig,
} from "../types/common";
import {
  Applier,
  FeatureApplierBuilderOptions,
  Modifier,
  Runner,
} from "../types/core";

import { createCommonBuilder } from "./create-common-builder";
import { defaultProcessRun } from "./default-process-run";

export type CreateFeatureApplierProps = FeatureApplierBuilderOptions & {
  runners: Runner[];
  appliers: Applier[];
  modifiers: Modifier[];
  helpers: Record<string, (...args: any) => unknown>;
};

export const createFeaturesApplier = ({
  appliers,
  modifiers,
  helpers,
  runners,
  defaultRunner: outerDefaultRunner,
  processBuild = defaultProcessRun,
}: CreateFeatureApplierProps): FeaturesApplier<
  Runner[],
  string,
  Record<string, (...args: any) => unknown>
> => {
  if (!appliers.length) {
    throw Error(
      "No appliers provided. Ensure that at least one applier is specified when configuring the feature applier."
    );
  }
  if (!runners.length) {
    throw Error(
      "No runners available. Ensure that the getRunners function returns at least one runner."
    );
  }

  const defaultRunner = outerDefaultRunner ?? runners[0].name;

  return function featuresApplier(featuresCallback) {
    const runsConfig: RunConfig[] = [];

    const getRunner = (runnerName: string) => {
      const runner = runners.find((runner) => runner.name === runnerName);

      if (!runner) {
        throw Error(
          `Runner not found for the specified name: ${runnerName}. Check the runner names provided and ensure they match available runners.`
        );
      }

      return runner;
    };

    const getBuilder: (runner: Runner, idx: number) => Builder = (
      runner,
      idx
    ) =>
      new Proxy(
        {},
        {
          get(_, prop) {
            const builder = getBuilder(runner, idx);

            if (!runsConfig[idx]) {
              const runnerConfig: RunConfig = {
                runner,
                appliers: [],
              };
              runsConfig.push(runnerConfig);
            }
            const currentConfig: RunConfig = runsConfig[idx];

            const setRunConfig = (nextRunConfig: Partial<RunConfig>) => {
              runsConfig[idx] = {
                ...currentConfig,
                ...nextRunConfig,
              };
            };

            const getCommonBuilder = createCommonBuilder({
              appliers,
              builder,
              modifiers,
              runConfig: currentConfig,
              setRunConfig,
            });

            const runHelpers = {
              getCommonBuilder,
              createApplierConfig,
              createModifierConfig,
              assignObjectDescriptors,
            };
            const runOptions = {
              runConfig: currentConfig,
              builder,
              helpers: runHelpers,
              setRunConfig,
            };

            return runner.build(runOptions)[prop];
          },
        }
      );

    const initialBuilder: Builder = new Proxy(
      (runnerName: string) =>
        getBuilder(getRunner(runnerName), runsConfig.length),
      {
        get(_, prop) {
          return getBuilder(getRunner(defaultRunner), runsConfig.length)[prop];
        },
      }
    );

    featuresCallback(initialBuilder, helpers);

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
              (modifier) => (element: React.ComponentType<any>) =>
                modifier.item.apply(...modifier.args)(
                  options,
                  setModifierContext
                )(element, originElement)
            )
          )(originElement);
      })
    );
  };
};
