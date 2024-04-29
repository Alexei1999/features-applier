import { RunConfig, Builder, Applier, Modifier } from "../models/model";
import { capitalize, mergeWithDescriptors } from "./common";

type CommonProps = { builder: Builder; initApplier: (...args: any[]) => any };
type ModifierCommonProps = { modifiersMap: Record<string, any> } & CommonProps;

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
  setApplierHelpers?: () => any;
};

const commonBuilderDefault = {
  renameApplier: (name) => "apply" + capitalize(name),
  renameModifier: (name) => name,
  setModifierReturn: ({ builder, modifiersMap }) =>
    mergeWithDescriptors(builder, modifiersMap),
  setModifierInit: ({ initModifier, modifiersMap }) =>
    mergeWithDescriptors(initModifier, modifiersMap),
  setApplierReturn: ({ builder }) => builder,
  setApplierInit: ({ initApplier, modifiersMap }) =>
    mergeWithDescriptors(initApplier, modifiersMap),
} as const satisfies CommonBuilderProps;

export const createCommonBuilder =
  ({
    builder,
    appliers,
    modifiers,
    runConfig,
    setRunConfig,
  }: {
    builder: Builder;
    appliers: Applier[];
    modifiers: Modifier[];
    runConfig: RunConfig;
    setRunConfig: (nextRunConfig: Partial<RunConfig>) => void;
  }) =>
  ({
    renameApplier = commonBuilderDefault.renameApplier,
    renameModifier = commonBuilderDefault.renameModifier,
    setModifierReturn = commonBuilderDefault.setModifierReturn,
    setModifierInit = commonBuilderDefault.setModifierInit,
    setModifierHelpers,
    setApplierReturn = commonBuilderDefault.setApplierReturn,
    setApplierInit = commonBuilderDefault.setApplierInit,
    setApplierHelpers,
  }: CommonBuilderProps = {}) => {
    return appliers.reduce(
      (appliers, applier) =>
        mergeWithDescriptors(appliers, {
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
                mergeWithDescriptors(modifiersAggregation, {
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
      setApplierHelpers?.() ?? {}
    );
  };
