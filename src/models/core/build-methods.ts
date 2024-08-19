import { BuildMethodsConfig, RunConfig } from "../types/common";

export const buildMethods = {
  use:
    ({ editRunsConfigs }) =>
    (nextRunsConfig: RunConfig[]) => {
      editRunsConfigs((runsConfig) => [...runsConfig, ...nextRunsConfig]);
    },
} as const satisfies BuildMethodsConfig;
