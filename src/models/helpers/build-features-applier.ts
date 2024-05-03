import { createFeaturesApplier } from "src/models/helpers/create-features-applier";
import { defaultProcessRun } from "src/models/helpers/default-process-run";
import { core } from "src/models/core/index";
import { Applier, Modifier, Runner } from "src/models/types/core";
import {
  RunConfig,
  FeaturesApplierPlugin,
  FeaturesApplier,
} from "../types/common";

export type FeatureApplierBuilderOptions = {
  processBuild?: (runsConfig: RunConfig[]) => RunConfig[];
  defaultRunner?: string;
};

export type FeaturesApplierBuilder<
  R extends Runner[] = [],
  A extends Applier[] = [],
  M extends Modifier[] = [],
  H extends Record<string, (...args: any) => unknown> = {}
> = {
  _runners: R;
  _appliers: A;
  _modifiers: M;
  _helpers: H;
  getDefaults: () => typeof core;
  addHelpers: <P extends Record<string, (...args: any) => unknown>>(
    helpers: P
  ) => FeaturesApplierBuilder<R, A, M, H & P>;
  addModifiers: <P extends Modifier[]>(
    ...modifiers: P
  ) => FeaturesApplierBuilder<R, A, [...M, ...P], H>;
  addAppliers: <P extends Applier[]>(
    ...appliers: P
  ) => FeaturesApplierBuilder<R, [...A, ...P], M, H>;
  addPlugin: <
    PA extends Applier[] = [],
    PM extends Modifier[] = [],
    PH extends Record<string, (...args: any) => unknown> = {}
  >(
    plugin: FeaturesApplierPlugin<PA, PM, PH>
  ) => FeaturesApplierBuilder<R, [...A, ...PA], [...M, ...PM], H & PH>;
  createRunners: <P extends Runner[]>(
    crFn: (appliers: A, modifiers: M) => P
  ) => FeaturesApplierBuilder<[...R, ...P], A, M, H>;
  finish: <DR extends R[number]["name"] = R[0]["name"]>(
    options?: Omit<FeatureApplierBuilderOptions, "defaultRunner"> & {
      defaultRunner?: DR;
    }
  ) => FeaturesApplier<R, DR, H>;
};

const builder: FeaturesApplierBuilder = {
  _runners: [] as const,
  _appliers: [] as const,
  _modifiers: [] as const,
  _helpers: {} as const,
  getDefaults: () => core,
  addModifiers: (...modifiers) => ({
    ...(builder as any),
    _modifiers: [...builder._modifiers, ...modifiers],
  }),
  addAppliers: (...appliers) => ({
    ...(builder as any),
    _appliers: [...builder._appliers, ...appliers],
  }),
  addHelpers: (helpers) => ({
    ...(builder as any),
    _helpers: { ...builder._helpers, ...helpers },
  }),
  addPlugin: (plugin) => ({
    ...(builder as any),
    _modifiers: [...builder._modifiers, ...plugin.modifiers],
    _appliers: [...builder._appliers, ...plugin.appliers],
    _helpers: { ...builder._helpers, ...plugin.helpers },
  }),
  createRunners: (crFn) => ({
    ...(builder as any),
    _runners: [
      ...builder._runners,
      ...crFn(builder._appliers, builder._modifiers),
    ],
  }),
  finish: ({ processBuild = defaultProcessRun, defaultRunner, ...options }) =>
    createFeaturesApplier({
      appliers: builder._appliers,
      modifiers: builder._modifiers,
      helpers: builder._helpers,
      runners: builder._runners,
      processBuild,
      defaultRunner,
      ...options,
    }),
} as const;

export const buildFeaturesApplier = builder;
