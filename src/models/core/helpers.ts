import { pipeline } from "../../lib/pipeline";

export const helpers = {
  pipeline,
} as const satisfies Record<string, (...args: any[]) => unknown>;
