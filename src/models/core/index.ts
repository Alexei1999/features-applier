import { FeaturesApplierPlugin } from "../types/common";

import { appliers } from "./appliers";
import { buildMethods } from "./build-methods";
import { helpers } from "./helpers";
import { modifiers } from "./modifiers";
import { getRunners } from "./runners";

export const core = {
  getDefaultRunners: getRunners,
  defaultBuildParams: {
    buildMethods,
  },
  defaultPlugin: {
    appliers,
    helpers,
    modifiers,
  } as const satisfies FeaturesApplierPlugin,
} as const;
