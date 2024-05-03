import { FeaturesApplierPlugin } from "../types/common";
import { appliers } from "./appliers";
import { helpers } from "./helpers";
import { modifiers } from "./modifiers";
import { getRunners } from "./runners";

export const core = {
  getDefaultRunners: getRunners,
  defaultPlugin: {
    appliers,
    helpers,
    modifiers,
  } as const satisfies FeaturesApplierPlugin,
} as const;
