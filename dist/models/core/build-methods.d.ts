import { RunConfig } from "../types/common";
export declare const buildMethods: {
    readonly use: ({ editRunsConfigs }: {
        runsConfig: RunConfig<import("../types/core").Runner, import("../types/core").Applier, any[]>[];
        editRunsConfigs: (cb: (runsConfig: RunConfig<import("../types/core").Runner, import("../types/core").Applier, any[]>[]) => RunConfig<import("../types/core").Runner, import("../types/core").Applier, any[]>[]) => void;
    }) => (nextRunsConfig: RunConfig[]) => void;
};
//# sourceMappingURL=build-methods.d.ts.map