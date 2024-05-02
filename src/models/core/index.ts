import { FeatureApplierPlugin } from "../model";
import { appliers } from "./appliers";
import { helpers } from "./helpers";
import { modifiers } from "./modifiers";
import { getRunners } from "./runners";

export const defaultPlugin = {
  appliers,
  helpers,
  modifiers,
  // TODO: 'Instantiation Expression' does not work correctly with dynamic types
  // getRunners
} as const satisfies FeatureApplierPlugin;

export const core = {
  getRunners,
} as const;
