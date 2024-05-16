import { core } from "../core/index";
import { FeaturesApplier, FeaturesApplierPlugin } from "../types/common";
import {
  Applier,
  FeatureApplierBuilderOptions,
  Modifier,
  Runner,
} from "../types/core";

import { createFeaturesApplier } from "./create-features-applier";
import { defaultProcessRun } from "./default-process-run";

export type FeaturesApplierBuilderUtils = {
  getDefaults: () => typeof core;
};
export type FeaturesApplierBuilder<
  R extends Runner[] = [],
  A extends Applier[] = [],
  M extends Modifier[] = [],
  // eslint-disable-next-line @typescript-eslint/ban-types
  H extends Record<string, (...args: any) => unknown> = {}
> = {
  _runners: R;
  _appliers: A;
  _modifiers: M;
  _helpers: H;
  addHelpers: <
    P extends Record<
      string,
      (this: FeaturesApplierBuilder<R, A, M, H>, ...args: any) => unknown
    >
  >(
    helpers: P
  ) => FeaturesApplierBuilder<R, A, M, H & P>;
  addModifiers: <P extends Modifier[]>(
    this: FeaturesApplierBuilder<R, A, M, H>,
    ...modifiers: P
  ) => FeaturesApplierBuilder<R, A, [...M, ...P], H>;
  addAppliers: <P extends Applier[]>(
    this: FeaturesApplierBuilder<R, A, M, H>,
    ...appliers: P
  ) => FeaturesApplierBuilder<R, [...A, ...P], M, H>;
  addPlugin: <
    PA extends Applier[] = [],
    PM extends Modifier[] = [],
    // eslint-disable-next-line @typescript-eslint/ban-types
    PH extends Record<string, (...args: any) => unknown> = {}
  >(
    this: FeaturesApplierBuilder<R, A, M, H>,
    plugin: FeaturesApplierPlugin<PA, PM, PH>
  ) => FeaturesApplierBuilder<R, [...A, ...PA], [...M, ...PM], H & PH>;
  createRunners: <P extends Runner[]>(
    this: FeaturesApplierBuilder<R, A, M, H>,
    crFn: (appliers: A, modifiers: M) => P
  ) => FeaturesApplierBuilder<[...R, ...P], A, M, H>;
  finish: <DR extends R[number]["name"] = R[0]["name"]>(
    options?: Omit<FeatureApplierBuilderOptions, "defaultRunner"> & {
      defaultRunner?: DR;
    }
  ) => FeaturesApplier<R, DR, H>;
};

export type InitFeatureApplierBuilder = (() => FeaturesApplierBuilder) &
  FeaturesApplierBuilderUtils;

export const buildFeaturesApplier: InitFeatureApplierBuilder = Object.assign(
  () =>
    ({
      _runners: [] as const,
      _appliers: [] as const,
      _modifiers: [] as const,
      _helpers: {} as const,
      addModifiers(...modifiers) {
        return {
          ...(this as any),
          _modifiers: [...this._modifiers, ...modifiers],
        };
      },
      addAppliers(...appliers) {
        return {
          ...(this as any),
          _appliers: [...this._appliers, ...appliers],
        };
      },
      addHelpers(helpers) {
        return {
          ...(this as any),
          _helpers: { ...this._helpers, ...helpers },
        };
      },
      addPlugin(plugin) {
        return {
          ...(this as any),
          _modifiers: [...this._modifiers, ...plugin.modifiers],
          _appliers: [...this._appliers, ...plugin.appliers],
          _helpers: { ...this._helpers, ...plugin.helpers },
        };
      },
      createRunners(crFn) {
        return {
          ...(this as any),
          _runners: [
            ...this._runners,
            ...crFn(this._appliers, this._modifiers),
          ],
        };
      },
      finish({
        processBuild = defaultProcessRun,
        defaultRunner,
        ...options
      } = {}) {
        return createFeaturesApplier({
          appliers: this._appliers,
          modifiers: this._modifiers,
          helpers: this._helpers,
          runners: this._runners,
          processBuild,
          defaultRunner,
          ...options,
        });
      },
    } as const satisfies FeaturesApplierBuilder),
  {
    getDefaults: () => core,
  } as const satisfies FeaturesApplierBuilderUtils
) satisfies InitFeatureApplierBuilder;
