import React from "react";

import { Applier, Modifier, Runner } from "./core";

export type ModifierRunContext = Record<string, string | boolean | number>;
export type ModifierRunOptions = {
  context: ModifierRunContext;
  applier: RunConfig["appliers"][number];
};

export type ModifierParams<T extends Modifier> = T["pickProps"] extends (
  ...args: any[]
) => unknown
  ? Parameters<Exclude<T["pickProps"], undefined>>
  : [];

export type RunModifierConfig<T extends any[] = any[]> = {
  item: Modifier<T>;
  args: any[];
};

export type RunApplierConfig<
  A extends Applier = Applier,
  T extends any[] = any[]
> = {
  item: A;
  args: any[];
  modifiers: RunModifierConfig<T>[];
};

export type RunConfig<
  R extends Runner = Runner,
  A extends Applier = Applier,
  T extends any[] = any[]
> = {
  runner: R;
  appliers: RunApplierConfig<A, T>[];
};

export type CreateRunners = <
  A extends Applier[] = any[],
  M extends Modifier[] = any[]
>(
  appliers: A,
  modifiers: M
) => Runner[];

export type FeaturesApplierPlugin<
  A extends Applier[] = Applier[],
  M extends Modifier[] = Modifier[],
  H extends Record<string, (...args: any) => unknown> = Record<
    string,
    (...args: any) => unknown
  >
> = {
  appliers: A;
  modifiers: M;
  helpers: H;
};

export type Builder<
  R extends Readonly<Runner[]> = any[],
  DR extends Runner = any,
  U = Record<string, (...args: any[]) => unknown>
> = U &
  ReturnType<DR["build"]> &
  (<T extends R[number]["name"]>(
    runner: T
  ) => ReturnType<Extract<R[number], { name: T }>["build"]>);

export type OverrideProps<
  OP = undefined,
  NP = undefined,
  P = undefined
> = NP extends undefined
  ? OP extends undefined
    ? P
    : {
        [K in keyof P as K extends keyof OP ? never : K]: P[K];
      } & {
        [K in keyof OP as OP[K] extends never ? never : K]: OP[K];
      }
  : NP;

export declare type FeaturesApplier<
  R extends Readonly<Runner[]>,
  DR extends R[number]["name"] | string,
  H
> = <OP = undefined, NP = undefined>(
  featuresCallback: (
    builder: Builder<R, Extract<R[number], { name: DR }>>,
    helpers: H
  ) => void
) => <P = undefined>(
  component: React.ComponentType<P>
) => React.ComponentType<OverrideProps<OP, NP, P>>;
