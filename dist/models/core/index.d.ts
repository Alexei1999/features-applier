/// <reference types="react" />
export declare const core: {
    readonly getDefaultRunners: <A extends readonly import("../types/core").Applier[], M extends readonly import("../types/core").Modifier[], U extends import("../types/common").BuildMethodsConfig>(_: A, __: M, ___: U) => [{
        readonly name: "sequential";
        readonly build: ({ helpers: { getCommonBuilder } }: {
            runConfig: import("../types/common").RunConfig;
            setRunConfig: (nextRunConfig: Partial<import("../types/common").RunConfig>) => void;
            builder: any;
            helpers: Record<string, (...args: any[]) => unknown> & {
                getCommonBuilder: (options?: import("../helpers/create-common-builder").CommonBuilderProps) => any;
                createApplierConfig: import("../../lib/common").CreateApplierConfig;
                createModifierConfig: import("../../lib/common").CreateModifierConfig;
            };
        }) => import("./runners").SequentialBuilder<A, M, U>;
    }, {
        readonly name: "direct";
        readonly build: ({ helpers: { getCommonBuilder } }: {
            runConfig: import("../types/common").RunConfig;
            setRunConfig: (nextRunConfig: Partial<import("../types/common").RunConfig>) => void;
            builder: any;
            helpers: Record<string, (...args: any[]) => unknown> & {
                getCommonBuilder: (options?: import("../helpers/create-common-builder").CommonBuilderProps) => any;
                createApplierConfig: import("../../lib/common").CreateApplierConfig;
                createModifierConfig: import("../../lib/common").CreateModifierConfig;
            };
        }) => import("./runners").DirectBuilder<A, M, U>;
        readonly editRunConfig: (runConfig: import("../types/common").RunConfig) => {
            appliers: {
                args: any;
                modifiers: any[];
                item: import("../types/core").Applier;
            }[];
            runner: import("../types/core").Runner;
        };
    }];
    readonly defaultBuildParams: {
        readonly buildMethods: {
            readonly use: ({ editRunsConfigs }: {
                runsConfig: import("../types/common").RunConfig<import("../types/core").Runner, import("../types/core").Applier, any[]>[];
                editRunsConfigs: (cb: (runsConfig: import("../types/common").RunConfig<import("../types/core").Runner, import("../types/core").Applier, any[]>[]) => import("../types/common").RunConfig<import("../types/core").Runner, import("../types/core").Applier, any[]>[]) => void;
            }) => (nextRunsConfig: import("../types/common").RunConfig[]) => void;
        };
    };
    readonly defaultPlugin: {
        readonly appliers: [{
            readonly name: "hooks";
            readonly apply: (...hooks: ((props: any) => Record<string, unknown>)[]) => (Component: import("react").ComponentType<{}>) => (props: any) => JSX.Element;
        }, {
            readonly name: "HOCs";
            readonly apply: (...HOCs: ((Component: import("react").ComponentType<any>) => import("react").ComponentType<any>)[]) => (Component: import("react").ComponentType<any>) => any;
        }];
        readonly helpers: {
            readonly pipeline: typeof import("../../lib/pipeline").pipeline;
        };
        readonly modifiers: [{
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
        }];
    };
};
//# sourceMappingURL=index.d.ts.map