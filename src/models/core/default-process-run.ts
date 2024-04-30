import { pipeline } from "../../lib/pipeline";
import { RunConfig } from "../model";

const splashRuns = (runsConfig: RunConfig[]): RunConfig[] => {
  return runsConfig.reduce((runsConfig, runConfig, index) => {
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
            args: [...applier.args, ...lastApplier.args],
            modifiers: [...applier.modifiers, ...lastApplier.modifiers],
          },
        ];
      },
      [] as RunConfig["appliers"]
    );

    const splashedRun: RunConfig = {
      ...runConfig,
      appliers: splashedFeatures,
    };

    if (index === 0) {
      return [splashedRun];
    }

    const lastRun = runsConfig.at(-1);

    if (!lastRun || lastRun.runner.name !== splashedRun.runner.name) {
      return [...runsConfig, splashedRun];
    }

    return [
      ...runsConfig.slice(0, -1),
      {
        ...lastRun,
        appliers: [...runConfig.appliers, ...lastRun.appliers],
      },
    ];
  }, [] as RunConfig[]);
};

const sortModifiers = (runsConfig: RunConfig[]): RunConfig[] => {
  return runsConfig.map((runConfig) => ({
    ...runConfig,
    appliers: runConfig.appliers.map((feature) => ({
      ...feature,
      modifiers: feature.modifiers.sort(
        (m1, m2) => m1.item.priority ?? 0 - m2.item.priority ?? 0
      ),
    })),
  }));
};

export const defaultProcessRun = pipeline(splashRuns, sortModifiers);
