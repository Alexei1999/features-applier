/// <reference types="react" />
import { buildFeaturesApplier } from "./models/helpers/build-features-applier";
declare const applyFeatures: import("./models/types/common").FeaturesApplier<[{
    readonly name: "sequential";
    readonly build: ({ helpers: { getCommonBuilder } }: {
        runConfig: import("./models/types/common").RunConfig;
        setRunConfig: (nextRunConfig: Partial<import("./models/types/common").RunConfig>) => void;
        builder: any;
        helpers: Record<string, (...args: any[]) => unknown> & {
            getCommonBuilder: (options?: import("./models/helpers/create-common-builder").CommonBuilderProps) => any;
            createApplierConfig: import("./lib/common").CreateApplierConfig;
            createModifierConfig: import("./lib/common").CreateModifierConfig;
        };
    }) => import("./models/core/runners").SequentialBuilder<[{
        readonly name: "hooks";
        readonly apply: (...hooks: ((props: any) => Record<string, unknown>)[]) => (Component: import("react").ComponentType<{}>) => (props: any) => JSX.Element;
    }, {
        readonly name: "HOCs";
        readonly apply: (...HOCs: ((Component: import("react").ComponentType<any>) => import("react").ComponentType<any>)[]) => (Component: import("react").ComponentType<any>) => any;
    }], [{
        readonly priority: 100;
        readonly name: "filtered";
        readonly editProps: (props_0: (...args: any[]) => unknown, ...args: any[]) => {
            modifierProps: ((...args: any[]) => unknown)[];
            nextProps: any[];
        };
        readonly apply: (filter: (...args: any[]) => unknown) => () => (Component: import("react").ComponentType<{}>, OriginComponent: import("react").ComponentType<{}>) => (props: any) => JSX.Element;
    }, {
        readonly name: "fromRight";
        readonly editProps: (...args: any[]) => {
            nextProps: any[];
        };
    }], {
        readonly use: ({ editRunsConfigs }: {
            runsConfig: import("./models/types/common").RunConfig<import("./models/types/core").Runner, import("./models/types/core").Applier, any[]>[];
            editRunsConfigs: (cb: (runsConfig: import("./models/types/common").RunConfig<import("./models/types/core").Runner, import("./models/types/core").Applier, any[]>[]) => import("./models/types/common").RunConfig<import("./models/types/core").Runner, import("./models/types/core").Applier, any[]>[]) => void;
        }) => (nextRunsConfig: import("./models/types/common").RunConfig[]) => void;
    }>;
}, {
    readonly name: "direct";
    readonly build: ({ helpers: { getCommonBuilder } }: {
        runConfig: import("./models/types/common").RunConfig;
        setRunConfig: (nextRunConfig: Partial<import("./models/types/common").RunConfig>) => void;
        builder: any;
        helpers: Record<string, (...args: any[]) => unknown> & {
            getCommonBuilder: (options?: import("./models/helpers/create-common-builder").CommonBuilderProps) => any;
            createApplierConfig: import("./lib/common").CreateApplierConfig;
            createModifierConfig: import("./lib/common").CreateModifierConfig;
        };
    }) => import("./models/core/runners").DirectBuilder<[{
        readonly name: "hooks";
        readonly apply: (...hooks: ((props: any) => Record<string, unknown>)[]) => (Component: import("react").ComponentType<{}>) => (props: any) => JSX.Element;
    }, {
        readonly name: "HOCs";
        readonly apply: (...HOCs: ((Component: import("react").ComponentType<any>) => import("react").ComponentType<any>)[]) => (Component: import("react").ComponentType<any>) => any;
    }], [{
        readonly priority: 100;
        readonly name: "filtered";
        readonly editProps: (props_0: (...args: any[]) => unknown, ...args: any[]) => {
            modifierProps: ((...args: any[]) => unknown)[];
            nextProps: any[];
        };
        readonly apply: (filter: (...args: any[]) => unknown) => () => (Component: import("react").ComponentType<{}>, OriginComponent: import("react").ComponentType<{}>) => (props: any) => JSX.Element;
    }, {
        readonly name: "fromRight";
        readonly editProps: (...args: any[]) => {
            nextProps: any[];
        };
    }], {
        readonly use: ({ editRunsConfigs }: {
            runsConfig: import("./models/types/common").RunConfig<import("./models/types/core").Runner, import("./models/types/core").Applier, any[]>[];
            editRunsConfigs: (cb: (runsConfig: import("./models/types/common").RunConfig<import("./models/types/core").Runner, import("./models/types/core").Applier, any[]>[]) => import("./models/types/common").RunConfig<import("./models/types/core").Runner, import("./models/types/core").Applier, any[]>[]) => void;
        }) => (nextRunsConfig: import("./models/types/common").RunConfig[]) => void;
    }>;
    readonly editRunConfig: (runConfig: import("./models/types/common").RunConfig) => {
        appliers: {
            args: any;
            modifiers: any[];
            item: import("./models/types/core").Applier;
        }[];
        runner: import("./models/types/core").Runner;
    };
}], "direct", {
    readonly pipeline: typeof import("./lib/pipeline").pipeline;
}>, buildFeatures: import("./models/types/common").FeaturesBuilder<[{
    readonly name: "sequential";
    readonly build: ({ helpers: { getCommonBuilder } }: {
        runConfig: import("./models/types/common").RunConfig;
        setRunConfig: (nextRunConfig: Partial<import("./models/types/common").RunConfig>) => void;
        builder: any;
        helpers: Record<string, (...args: any[]) => unknown> & {
            getCommonBuilder: (options?: import("./models/helpers/create-common-builder").CommonBuilderProps) => any;
            createApplierConfig: import("./lib/common").CreateApplierConfig;
            createModifierConfig: import("./lib/common").CreateModifierConfig;
        };
    }) => import("./models/core/runners").SequentialBuilder<[{
        readonly name: "hooks";
        readonly apply: (...hooks: ((props: any) => Record<string, unknown>)[]) => (Component: import("react").ComponentType<{}>) => (props: any) => JSX.Element;
    }, {
        readonly name: "HOCs";
        readonly apply: (...HOCs: ((Component: import("react").ComponentType<any>) => import("react").ComponentType<any>)[]) => (Component: import("react").ComponentType<any>) => any;
    }], [{
        readonly priority: 100;
        readonly name: "filtered";
        readonly editProps: (props_0: (...args: any[]) => unknown, ...args: any[]) => {
            modifierProps: ((...args: any[]) => unknown)[];
            nextProps: any[];
        };
        readonly apply: (filter: (...args: any[]) => unknown) => () => (Component: import("react").ComponentType<{}>, OriginComponent: import("react").ComponentType<{}>) => (props: any) => JSX.Element;
    }, {
        readonly name: "fromRight";
        readonly editProps: (...args: any[]) => {
            nextProps: any[];
        };
    }], {
        readonly use: ({ editRunsConfigs }: {
            runsConfig: import("./models/types/common").RunConfig<import("./models/types/core").Runner, import("./models/types/core").Applier, any[]>[];
            editRunsConfigs: (cb: (runsConfig: import("./models/types/common").RunConfig<import("./models/types/core").Runner, import("./models/types/core").Applier, any[]>[]) => import("./models/types/common").RunConfig<import("./models/types/core").Runner, import("./models/types/core").Applier, any[]>[]) => void;
        }) => (nextRunsConfig: import("./models/types/common").RunConfig[]) => void;
    }>;
}, {
    readonly name: "direct";
    readonly build: ({ helpers: { getCommonBuilder } }: {
        runConfig: import("./models/types/common").RunConfig;
        setRunConfig: (nextRunConfig: Partial<import("./models/types/common").RunConfig>) => void;
        builder: any;
        helpers: Record<string, (...args: any[]) => unknown> & {
            getCommonBuilder: (options?: import("./models/helpers/create-common-builder").CommonBuilderProps) => any;
            createApplierConfig: import("./lib/common").CreateApplierConfig;
            createModifierConfig: import("./lib/common").CreateModifierConfig;
        };
    }) => import("./models/core/runners").DirectBuilder<[{
        readonly name: "hooks";
        readonly apply: (...hooks: ((props: any) => Record<string, unknown>)[]) => (Component: import("react").ComponentType<{}>) => (props: any) => JSX.Element;
    }, {
        readonly name: "HOCs";
        readonly apply: (...HOCs: ((Component: import("react").ComponentType<any>) => import("react").ComponentType<any>)[]) => (Component: import("react").ComponentType<any>) => any;
    }], [{
        readonly priority: 100;
        readonly name: "filtered";
        readonly editProps: (props_0: (...args: any[]) => unknown, ...args: any[]) => {
            modifierProps: ((...args: any[]) => unknown)[];
            nextProps: any[];
        };
        readonly apply: (filter: (...args: any[]) => unknown) => () => (Component: import("react").ComponentType<{}>, OriginComponent: import("react").ComponentType<{}>) => (props: any) => JSX.Element;
    }, {
        readonly name: "fromRight";
        readonly editProps: (...args: any[]) => {
            nextProps: any[];
        };
    }], {
        readonly use: ({ editRunsConfigs }: {
            runsConfig: import("./models/types/common").RunConfig<import("./models/types/core").Runner, import("./models/types/core").Applier, any[]>[];
            editRunsConfigs: (cb: (runsConfig: import("./models/types/common").RunConfig<import("./models/types/core").Runner, import("./models/types/core").Applier, any[]>[]) => import("./models/types/common").RunConfig<import("./models/types/core").Runner, import("./models/types/core").Applier, any[]>[]) => void;
        }) => (nextRunsConfig: import("./models/types/common").RunConfig[]) => void;
    }>;
    readonly editRunConfig: (runConfig: import("./models/types/common").RunConfig) => {
        appliers: {
            args: any;
            modifiers: any[];
            item: import("./models/types/core").Applier;
        }[];
        runner: import("./models/types/core").Runner;
    };
}], "direct", {
    readonly pipeline: typeof import("./lib/pipeline").pipeline;
}>;
export { applyFeatures, buildFeatures, buildFeaturesApplier };
//# sourceMappingURL=index.d.ts.map