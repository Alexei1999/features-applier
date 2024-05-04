import { ModifierParams, RunConfig, CreateRunners } from "../types/common";
import { Applier, Modifier } from "../types/core";

export type BuildModifiersSequentially<
  A extends Readonly<Applier[]>,
  M extends Readonly<Modifier[]>
> = {
  [K in M[number] as K["name"]]: ((
    ...item: ModifierParams<K>
  ) => BuildModifiersSequentially<A, M>) &
    BuildModifiersSequentially<A, M>;
} & {
  run: (...items: Parameters<A[number]["apply"]>) => SequentialBuilder<A, M>;
};
export type SequentialBuilder<
  A extends Readonly<Applier[]>,
  M extends Readonly<Modifier[]>
> = {
  [K in A[number] as `apply${Capitalize<K["name"]>}`]: ((
    ...items: Parameters<K["apply"]>
  ) => SequentialBuilder<A, M>) &
    BuildModifiersSequentially<A, M>;
};

export type BuildModifiersDirectly<
  A extends Readonly<Applier[]>,
  M extends Readonly<Modifier[]>
> = {
  [K in M[number] as K["name"]]: ((
    ...items: ModifierParams<K>
  ) => DirectBuilder<A, M>) &
    BuildModifiersDirectly<A, M>;
};
export type DirectBuilder<
  A extends Readonly<Applier[]>,
  M extends Readonly<Modifier[]>
> = {
  [K in A[number] as `apply${Capitalize<K["name"]>}`]: ((
    ...items: Parameters<K["apply"]>
  ) => DirectBuilder<A, M>) &
    BuildModifiersDirectly<A, M>;
};

export const getRunners = (<
  A extends Readonly<Applier[]>,
  M extends Readonly<Modifier[]>
>(
  _: A,
  __: M
) =>
  [
    {
      name: "sequential",
      build: ({ helpers: { getCommonBuilder } }) => {
        return getCommonBuilder({
          setModifierHelpers: ({ initApplier }) => ({ run: initApplier }),
          setModifierReturn: ({ modifiersMap }) => modifiersMap,
        }) as SequentialBuilder<A, M>;
      },
    },
    {
      name: "direct",
      build: ({ helpers: { getCommonBuilder } }) => {
        return getCommonBuilder() as DirectBuilder<A, M>;
      },
      editRunConfig: (runConfig) => ({
        ...runConfig,
        appliers: runConfig.appliers.map((applier) => ({
          ...applier,
          ...applier.modifiers.reduce(
            ({ args: nextArgs, modifiers }, modifier: any) => {
              const { modifierProps, nextProps } = modifier.item.pickProps?.(
                ...nextArgs
              ) ?? {
                modifierProps: [],
                nextProps: nextArgs,
              };
              return {
                args: nextProps,
                modifiers: [...modifiers, { ...modifier, args: modifierProps }],
              };
            },
            {
              args: applier.modifiers.at(-1)?.args || applier.args,
              modifiers: [] as RunConfig["appliers"][number]["modifiers"],
            }
          ),
        })),
      }),
    },
  ] as const) satisfies CreateRunners;
