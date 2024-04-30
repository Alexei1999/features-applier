import { MergeRunners, mergeWithDescriptors } from "./lib/common";
import { createCommonBuilder } from "./lib/create-common-builder";
import { pipeline } from "./lib/pipeline";
import { core } from "./models/core/index";
import { defaultProcessRun } from "./models/core/default-process-run";
import {
  Applier,
  Builder,
  CreateRunners,
  FeatureApplierCore,
  FeaturesApplier,
  Modifier,
  ModifierRunContext,
  ModifierRunOptions,
  RunConfig,
  Runner,
} from "./models/model";

export const createFeaturesApplier = <
  A extends Readonly<Applier[]> = [],
  M extends Readonly<Modifier[]> = [],
  R extends CreateRunners = () => [],
  H = Record<string, never>,
  C extends FeatureApplierCore = typeof core,
  DR extends MergeRunners<R, C["getRunners"]>[number]["name"] = MergeRunners<
    R,
    C["getRunners"]
  >[0]["name"]
>({
  defaultRunner: outerDefaultRunner,
  appliers: outerAppliers,
  helpers: outerHelpers,
  modifiers: outerModifiers,
  getRunners: outerRunnersGetter,
  core: outerCore = core as any,
  processBuild = defaultProcessRun,
}: {
  defaultRunner?: DR;
  appliers?: A;
  helpers?: H;
  modifiers?: M;
  getRunners?: R;
  core?: C;
  processBuild?: (runsConfig: RunConfig[]) => RunConfig[];
} & Record<string, boolean | string | number> = {}): FeaturesApplier<
  ReturnType<
    typeof outerRunnersGetter<
      [...C["appliers"], ...A],
      [...C["modifiers"], ...M]
    > &
      typeof core.getRunners<
        [...C["appliers"], ...A],
        [...C["modifiers"], ...M]
      >
  >,
  DR,
  C["helpers"] & H
> => {
  const {
    appliers: coreAppliers,
    helpers: coreHelpers,
    modifiers: coreModifiers,
    getRunners: coreRunnersGetter,
  } = outerCore || core || {};

  const appliers = [...(coreAppliers || []), ...(outerAppliers || [])];
  const modifiers = [...(coreModifiers || []), ...(outerModifiers || [])];
  const helpers = { ...coreHelpers, ...outerHelpers } as C["helpers"] & H;
  const runners = [
    ...(coreRunnersGetter?.(appliers, modifiers) || []),
    ...(outerRunnersGetter?.(appliers, modifiers) || []),
  ];

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

  // FIXME: Broken types
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
                runner: runner,
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
              mergeWithDescriptors,
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
      (runnerName: string) => {
        return getBuilder(getRunner(runnerName), runsConfig.length);
      },
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

        return (originElement: any) =>
          pipeline(
            applier.item.apply(...applier.args),
            ...applier.modifiers.map(
              (modifier) => (element: any) =>
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
