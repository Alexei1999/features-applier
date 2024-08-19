import { pipeline } from "../../lib/pipeline";
import { RunConfig } from "../types/common";

const filterRuns = (runsConfig: RunConfig[]): RunConfig[] =>
  runsConfig.filter((runConfig) => runConfig.appliers.length);

const splashRuns = (runsConfig: RunConfig[]): RunConfig[] =>
  runsConfig
    .reduce((runsConfig, runConfig, index) => {
      if (index === 0) {
        return [runConfig];
      }

      const lastRun = runsConfig.at(-1);

      if (!lastRun || lastRun.runner.name !== runConfig.runner.name) {
        return [...runsConfig, runConfig];
      }

      return [
        ...runsConfig.slice(0, -1),
        {
          ...lastRun,
          appliers: [...lastRun.appliers, ...runConfig.appliers],
        },
      ];
    }, [] as RunConfig[])
    .reduce((runsConfig, runConfig) => {
      const splashedFeatures = runConfig.appliers.reduce(
        (appliers, applier, index) => {
          if (index === 0) {
            return [applier];
          }

          const lastApplier = appliers.at(-1);

          if (!lastApplier || lastApplier.item.name !== applier.item.name) {
            return [...appliers, applier];
          }
          if (
            lastApplier.modifiers.length !== applier.modifiers.length ||
            applier.modifiers.some(
              (modifier, idx) =>
                modifier.item.name !== lastApplier.modifiers[idx].item.name
            )
          ) {
            return [...appliers, applier];
          }

          return [
            ...appliers.slice(0, -1),
            {
              ...lastApplier,
              args: [...lastApplier.args, ...applier.args],
              modifiers: [...lastApplier.modifiers, ...applier.modifiers],
            },
          ];
        },
        [] as RunConfig["appliers"]
      );

      const splashedRun: RunConfig = {
        ...runConfig,
        appliers: splashedFeatures,
      };

      return [...runsConfig, splashedRun];
    }, [] as RunConfig[]);

const sortModifiers = (runsConfig: RunConfig[]): RunConfig[] =>
  runsConfig.map((runConfig) => ({
    ...runConfig,
    appliers: runConfig.appliers.map((feature) => ({
      ...feature,
      modifiers: feature.modifiers.sort(
        (m1, m2) => (m1.item.priority ?? 0) - (m2.item.priority ?? 0)
      ),
    })),
  }));

const reverseRunConfig = (runsConfig: RunConfig[]): RunConfig[] =>
  runsConfig.map((runConfig) => ({
    ...runConfig,
    appliers: runConfig.appliers.toReversed(),
  }));
export const defaultProcessRun = pipeline(
  filterRuns,
  splashRuns,
  sortModifiers,
  reverseRunConfig
);
