import {
  assignObjectDescriptors,
  createApplierConfig,
  createModifierConfig,
} from "../../lib/common";
import { Builder, RunConfig } from "../types/common";
import { FeatureApplierCreateBuilderOptions, Runner } from "../types/core";

import { createCommonBuilder } from "./create-common-builder";
import { CreateFeatureApplierProps } from "./create-features-applier";

export const getBuilder = ({
  appliers,
  modifiers,
  runners,
  defaultRunner,
  buildMethods,
}: FeatureApplierCreateBuilderOptions & CreateFeatureApplierProps) => {
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

  const createBuilder = (runner: Runner): Builder => {
    const runConfig: RunConfig = {
      runner,
      appliers: [],
    };
    runsConfig.push(runConfig);

    const setRunConfig = (nextRunConfig: Partial<RunConfig>) => {
      Object.assign(runConfig, nextRunConfig);
    };
    const setRunsConfig = (nextRunsConfig: RunConfig[]) => {
      Object.assign(runsConfig, nextRunsConfig);
    };

    const builder = new Proxy(
      {},
      {
        get(_, prop) {
          const getCommonBuilder = createCommonBuilder({
            appliers,
            builder,
            modifiers,
            runConfig,
            runsConfig,
            setRunConfig,
            setRunsConfig,
            buildMethods,
          });

          const runHelpers = {
            getCommonBuilder,
            createApplierConfig,
            createModifierConfig,
            assignObjectDescriptors,
          };
          const runOptions = {
            runConfig,
            builder,
            helpers: runHelpers,
            setRunConfig,
          };

          return runner.build(runOptions)[prop];
        },
      }
    );

    return builder;
  };

  const initialBuilder: Builder = new Proxy(
    (runnerName: string) => createBuilder(getRunner(runnerName)),
    {
      get(_, prop) {
        return createBuilder(getRunner(defaultRunner))[prop];
      },
    }
  );

  return {
    builder: initialBuilder,
    runsConfig,
  } as const;
};
