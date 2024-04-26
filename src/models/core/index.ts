import { FeatureApplierCore } from "../model";

import { appliers } from "./appliers";
import { helpers } from "./helpers";
import { modifiers } from "./modifiers";
import { getRunners } from "./runners";

export const core = {
  appliers,
  helpers,
  modifiers,
  getRunners,
} as const satisfies FeatureApplierCore;
