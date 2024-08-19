import { core } from "../core/index";
import {
  BuildMethodsConfig,
  FeaturesApplier,
  FeaturesApplierPlugin,
  FeaturesBuilder,
} from "../types/common";
import {
  Applier,
  FeatureApplierOptions,
  Modifier,
  Runner,
} from "../types/core";

import { createFeaturesApplier } from "./create-features-applier";
import { createFeaturesBuilder } from "./create-features-builder";
import { defaultProcessRun } from "./default-process-run";

export type FeaturesApplierBuildUtils = {
  getDefaults: () => typeof core;
};
export type FeaturesApplierBuildFlow<
  U extends BuildMethodsConfig = {},
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
      (this: FeaturesApplierBuildFlow<U, R, A, M, H>, ...args: any) => unknown
    >
  >(
    helpers: P
  ) => FeaturesApplierBuildFlow<U, R, A, M, H & P>;
  addModifiers: <P extends Modifier[]>(
    this: FeaturesApplierBuildFlow<U, R, A, M, H>,
    ...modifiers: P
  ) => FeaturesApplierBuildFlow<U, R, A, [...M, ...P], H>;
  addAppliers: <P extends Applier[]>(
    this: FeaturesApplierBuildFlow<U, R, A, M, H>,
    ...appliers: P
  ) => FeaturesApplierBuildFlow<U, R, [...A, ...P], M, H>;
  addPlugin: <
    PA extends Applier[] = [],
    PM extends Modifier[] = [],
    // eslint-disable-next-line @typescript-eslint/ban-types
    PH extends Record<string, (...args: any) => unknown> = {}
  >(
    this: FeaturesApplierBuildFlow<U, R, A, M, H>,
    plugin: FeaturesApplierPlugin<PA, PM, PH>
  ) => FeaturesApplierBuildFlow<U, R, [...A, ...PA], [...M, ...PM], H & PH>;
  createRunners: <P extends Runner[]>(
    this: FeaturesApplierBuildFlow<U, R, A, M, H>,
    crFn: (appliers: A, modifiers: M, buildMethods: U) => P
  ) => FeaturesApplierBuildFlow<U, [...R, ...P], A, M, H>;
  finish: <DR extends R[number]["name"] = R[0]["name"]>(
    options?: Omit<FeatureApplierOptions, "defaultRunner"> & {
      defaultRunner?: DR;
    }
  ) => {
    applyFeatures: FeaturesApplier<R, DR, H>;
    buildFeatures: FeaturesBuilder<R, DR, H>;
  };
};

export type InitFeatureApplierBuilder = <
  U extends BuildMethodsConfig = {}
>(params?: {
  buildMethods: U;
}) => FeaturesApplierBuildFlow<U>;

export type FeatureApplierBuilder = InitFeatureApplierBuilder &
  FeaturesApplierBuildUtils;

export const buildFeaturesApplier: FeatureApplierBuilder = Object.assign(
  (({ buildMethods } = { buildMethods: {} as any }) =>
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
            ...crFn(this._appliers, this._modifiers, buildMethods as any),
          ],
        };
      },
      finish({
        processBuild = defaultProcessRun,
        defaultRunner,
        ...options
      } = {}) {
        const applyFeatures = createFeaturesApplier({
          appliers: this._appliers,
          modifiers: this._modifiers,
          helpers: this._helpers,
          runners: this._runners,
          processBuild,
          defaultRunner,
          buildMethods,
          ...options,
        });

        const buildFeatures = createFeaturesBuilder({
          appliers: this._appliers,
          modifiers: this._modifiers,
          helpers: this._helpers,
          runners: this._runners,
          buildMethods,
          defaultRunner,
        });

        return {
          applyFeatures,
          buildFeatures,
        };
      },
    } as const)) satisfies InitFeatureApplierBuilder,
  {
    getDefaults: () => core,
  } as const satisfies FeaturesApplierBuildUtils
) satisfies FeatureApplierBuilder;
