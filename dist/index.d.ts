/// <reference types="react" />
import { createFeaturesApplier } from "./create-features-applier";
declare const applyFeatures: import("./models/model").FeaturesApplier<readonly [{
    readonly name: "sequential";
    readonly build: ({ helpers: { getCommonBuilder } }: {
        runConfig: import("./models/model").RunConfig<import("./models/model").Runner<any>, import("./models/model").Applier<any[]>, any[]>;
        setRunConfig: (nextRunConfig: Partial<import("./models/model").RunConfig<import("./models/model").Runner<any>, import("./models/model").Applier<any[]>, any[]>>) => void;
        builder: any;
        helpers: Record<string, Function> & {
            getCommonBuilder: (options?: import("./lib/create-common-builder").CommonBuilderProps) => any;
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
        readonly pickProps: (props_0: (...args: any[]) => unknown, ...args: any[]) => {
            modifierProps: ((...args: any[]) => unknown)[];
            nextProps: any[];
        };
        readonly apply: (filter: (...args: any[]) => unknown) => () => (Component: import("react").ComponentType<{}>, OriginComponent: import("react").ComponentType<{}>) => (props: any) => JSX.Element;
    }]>;
}, {
    readonly name: "direct";
    readonly build: ({ helpers: { getCommonBuilder } }: {
        runConfig: import("./models/model").RunConfig<import("./models/model").Runner<any>, import("./models/model").Applier<any[]>, any[]>;
        setRunConfig: (nextRunConfig: Partial<import("./models/model").RunConfig<import("./models/model").Runner<any>, import("./models/model").Applier<any[]>, any[]>>) => void;
        builder: any;
        helpers: Record<string, Function> & {
            getCommonBuilder: (options?: import("./lib/create-common-builder").CommonBuilderProps) => any;
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
        readonly pickProps: (props_0: (...args: any[]) => unknown, ...args: any[]) => {
            modifierProps: ((...args: any[]) => unknown)[];
            nextProps: any[];
        };
        readonly apply: (filter: (...args: any[]) => unknown) => () => (Component: import("react").ComponentType<{}>, OriginComponent: import("react").ComponentType<{}>) => (props: any) => JSX.Element;
    }]>;
    readonly editRunConfig: (runConfig: import("./models/model").RunConfig<import("./models/model").Runner<any>, import("./models/model").Applier<any[]>, any[]>) => {
        appliers: {
            args: any;
            modifiers: any[];
            item: import("./models/model").Applier<any[]>;
        }[];
        runner: import("./models/model").Runner<any>;
    };
}], "direct", {
    readonly pipeline: typeof import("./lib/pipeline").pipeline;
} & Record<string, never>>;
export { applyFeatures, createFeaturesApplier };
//# sourceMappingURL=index.d.ts.map