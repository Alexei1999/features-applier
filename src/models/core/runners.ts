import {
  BuildMethods,
  BuildMethodsConfig,
  CreateRunners,
  ModifierParams,
  RunConfig,
} from "../types/common";
import { Applier, Modifier } from "../types/core";

export type BuildModifiersSequentially<
  A extends Readonly<Applier[]>,
  M extends Readonly<Modifier[]>,
  U extends BuildMethodsConfig
> = {
  [K in M[number] as K["name"]]: ((
    ...item: ModifierParams<K>
  ) => BuildModifiersSequentially<A, M, U>) &
    BuildModifiersSequentially<A, M, U>;
} & {
  run: (...items: Parameters<A[number]["apply"]>) => SequentialBuilder<A, M, U>;
};
export type SequentialBuilder<
  A extends Readonly<Applier[]>,
  M extends Readonly<Modifier[]>,
  U extends BuildMethodsConfig
> = {
  [K in A[number] as `apply${Capitalize<K["name"]>}`]: ((
    ...items: Parameters<K["apply"]>
  ) => SequentialBuilder<A, M, U>) &
    BuildModifiersSequentially<A, M, U>;
} & BuildMethods<U, { builder: SequentialBuilder<A, M, U> }>;

export type BuildModifiersDirectly<
  A extends Readonly<Applier[]>,
  M extends Readonly<Modifier[]>,
  U extends BuildMethodsConfig
> = {
  [K in M[number] as K["name"]]: ((
    ...items: ModifierParams<K>
  ) => DirectBuilder<A, M, U>) &
    BuildModifiersDirectly<A, M, U>;
};
export type DirectBuilder<
  A extends Readonly<Applier[]>,
  M extends Readonly<Modifier[]>,
  U extends BuildMethodsConfig
> = {
  [K in A[number] as `apply${Capitalize<K["name"]>}`]: ((
    ...items: Parameters<K["apply"]>
  ) => DirectBuilder<A, M, U>) &
    BuildModifiersDirectly<A, M, U>;
} & BuildMethods<U, { builder: DirectBuilder<A, M, U> }>;

export const getRunners = (<
  A extends Readonly<Applier[]>,
  M extends Readonly<Modifier[]>,
  U extends BuildMethodsConfig
>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: A,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  __: M,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ___: U
) =>
  [
    {
      name: "sequential",
      build: ({ helpers: { getCommonBuilder } }) => {
        return getCommonBuilder({
          setModifierHelpers: ({ initApplier }) => ({ run: initApplier }),
          setModifierReturn: ({ modifiersMap }) => modifiersMap,
        }) as SequentialBuilder<A, M, U>;
      },
    },
    {
      name: "direct",
      build: ({ helpers: { getCommonBuilder } }) => {
        return getCommonBuilder() as DirectBuilder<A, M, U>;
      },
      editRunConfig: (runConfig) => ({
        ...runConfig,
        appliers: runConfig.appliers.map((applier) => ({
          ...applier,
          ...applier.modifiers.reduce(
            ({ args: nextArgs, modifiers }, modifier: any) => {
              const { modifierProps, nextProps } = modifier.item.editProps?.(
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
