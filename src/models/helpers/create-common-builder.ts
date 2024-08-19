import {
  assignObjectDescriptors,
  assignToProxy,
  capitalize,
  extractBuildMethods,
} from "../../lib/common";
import {
  Builder,
  BuildMethods,
  BuildMethodsConfig,
  RunConfig,
} from "../types/common";
import { Applier, Modifier } from "../types/core";

type CommonProps = { builder: Builder; initApplier: (...args: any[]) => any };
type ModifierCommonProps = { modifiersMap: Record<string, any> } & CommonProps;
export type ExtractBuildMethodsParams = {
  buildMethods: BuildMethodsConfig;
  setRunsConfig: (nextRunsConfig: RunConfig[]) => void;
  builder: Builder;
} & Omit<Parameters<BuildMethodsConfig[string]>[0], "editRunsConfigs">;

export type CommonBuilderProps = {
  renameApplier?: (name: string) => string;
  renameModifier?: (name: string) => string;
  setModifierReturn?: (props: ModifierCommonProps) => any;
  setModifierInit?: (
    props: ModifierCommonProps & {
      initModifier: (...args: any[]) => any;
    }
  ) => any;
  setModifierHelpers?: (props: CommonProps) => any;
  setApplierReturn?: (props: { builder: Builder }) => any;
  setApplierInit?: (props: ModifierCommonProps) => any;
  setApplierHelpers?: (props: { methods: BuildMethods<any, any> }) => any;
  getMethods?: (options: ExtractBuildMethodsParams) => any;
};

const commonBuilderDefault = {
  renameApplier: (name) => "apply" + capitalize(name),
  renameModifier: (name) => name,
  setModifierReturn: ({ builder, modifiersMap }) =>
    assignToProxy(builder, modifiersMap),
  setModifierInit: ({ initModifier, modifiersMap }) =>
    assignObjectDescriptors(initModifier, modifiersMap),
  setApplierReturn: ({ builder }) => builder,
  setApplierInit: ({ initApplier, modifiersMap }) =>
    assignObjectDescriptors(initApplier, modifiersMap),
  setApplierHelpers: ({ methods }) => methods,
  getMethods: extractBuildMethods,
} as const satisfies CommonBuilderProps;

export const createCommonBuilder =
  ({
    builder,
    appliers,
    modifiers,
    runsConfig,
    runConfig,
    setRunConfig,
    setRunsConfig,
    buildMethods,
  }: {
    builder: Builder;
    appliers: Applier[];
    modifiers: Modifier[];
    runsConfig: RunConfig[];
    runConfig: RunConfig;
    setRunConfig: (nextRunConfig: Partial<RunConfig>) => void;
    setRunsConfig: (nextRunsConfig: RunConfig[]) => void;
    buildMethods: BuildMethodsConfig;
  }) =>
  ({
    renameApplier = commonBuilderDefault.renameApplier,
    renameModifier = commonBuilderDefault.renameModifier,
    getMethods = commonBuilderDefault.getMethods,
    setModifierReturn = commonBuilderDefault.setModifierReturn,
    setModifierInit = commonBuilderDefault.setModifierInit,
    setModifierHelpers,
    setApplierReturn = commonBuilderDefault.setApplierReturn,
    setApplierInit = commonBuilderDefault.setApplierInit,
    setApplierHelpers = commonBuilderDefault.setApplierHelpers,
  }: CommonBuilderProps = {}) => {
    const methods: BuildMethods<any, any> = getMethods({
      buildMethods,
      runsConfig,
      setRunsConfig,
      builder,
    });

    return appliers.reduce(
      (appliers, applier) =>
        assignObjectDescriptors(appliers, {
          get [renameApplier(applier.name)]() {
            const applierConfig: RunConfig["appliers"][number] = {
              item: applier,
              args: [],
              modifiers: [],
            };
            setRunConfig({
              appliers: [...runConfig.appliers, applierConfig],
            });
            function setApplier(...args: any[]) {
              applierConfig.args = args;
              return setApplierReturn({ builder });
            }

            const commonProps = {
              builder,
              initApplier: setApplier,
            };

            const modifiersMap = modifiers.reduce(
              (modifiersAggregation, modifier) =>
                assignObjectDescriptors(modifiersAggregation, {
                  get [renameModifier(modifier.name)]() {
                    const modifierConfig: RunConfig["appliers"][number]["modifiers"][number] =
                      {
                        item: modifier,
                        args: [],
                      };
                    applierConfig.modifiers.push(modifierConfig);

                    const modifierCommonProps = {
                      modifiersMap,
                      ...commonProps,
                    };

                    return setModifierInit({
                      initModifier: (...args: any[]) => {
                        modifierConfig.args = args;

                        return setModifierReturn(modifierCommonProps);
                      },
                      ...modifierCommonProps,
                    });
                  },
                }),
              setModifierHelpers?.(commonProps) ?? {}
            );

            return setApplierInit({ modifiersMap, ...commonProps });
          },
        }),
      setApplierHelpers?.({ methods }) ?? {}
    );
  };
