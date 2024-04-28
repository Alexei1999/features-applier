/// <reference types="react" />
export declare const core: {
    readonly appliers: readonly [{
        readonly name: "hooks";
        readonly apply: (...hooks: ((props: any) => Record<string, unknown>)[]) => (Component: import("react").ComponentType<{}>) => (props: any) => JSX.Element;
    }, {
        readonly name: "hocs";
        readonly apply: (...hocs: ((Component: import("react").ComponentType<any>) => import("react").ComponentType<any>)[]) => (Component: import("react").ComponentType<any>) => any;
    }];
    readonly helpers: {
        readonly pipeline: typeof import("../../lib/pipeline").pipeline;
    };
    readonly modifiers: readonly [{
        readonly name: "filtered";
        readonly pickProps: (props_0: (...args: any[]) => unknown, ...args: any[]) => {
            modifierProps: ((...args: any[]) => unknown)[];
            nextProps: any[];
        };
        readonly apply: (filter: (...args: any[]) => unknown) => () => (Component: import("react").ComponentType<{}>, OriginComponent: import("react").ComponentType<{}>) => (props: any) => JSX.Element;
    }];
    readonly getRunners: <A extends readonly import("../model").Applier[], M extends readonly import("../model").Modifier[]>() => readonly [{
        readonly name: "sequential";
        readonly build: ({ helpers: { getCommonBuilder } }: {
            runConfig: import("../model").RunConfig<import("../model").Runner<any>, import("../model").Applier<any[]>, any[]>;
            setRunConfig: (nextRunConfig: Partial<import("../model").RunConfig<import("../model").Runner<any>, import("../model").Applier<any[]>, any[]>>) => void;
            builder: any;
            helpers: Record<string, Function> & {
                getCommonBuilder: (options?: import("../../lib/create-common-builder").CommonBuilderProps) => any;
            };
        }) => import("./runners").SequentialBuilder<A, M>;
    }, {
        readonly name: "direct";
        readonly build: ({ helpers: { getCommonBuilder } }: {
            runConfig: import("../model").RunConfig<import("../model").Runner<any>, import("../model").Applier<any[]>, any[]>;
            setRunConfig: (nextRunConfig: Partial<import("../model").RunConfig<import("../model").Runner<any>, import("../model").Applier<any[]>, any[]>>) => void;
            builder: any;
            helpers: Record<string, Function> & {
                getCommonBuilder: (options?: import("../../lib/create-common-builder").CommonBuilderProps) => any;
            };
        }) => import("./runners").DirectBuilder<A, M>;
        readonly editRunConfig: (runConfig: import("../model").RunConfig<import("../model").Runner<any>, import("../model").Applier<any[]>, any[]>) => {
            appliers: {
                args: any;
                modifiers: any[];
                item: import("../model").Applier<any[]>;
            }[];
            runner: import("../model").Runner<any>;
        };
    }];
};
//# sourceMappingURL=index.d.ts.map