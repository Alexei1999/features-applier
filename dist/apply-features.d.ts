import React from "react";
import { pipeline } from "./lib/pipeline";
import { core } from "./models/core/index";
import { Applier, CreateRunners, FeatureApplierCore, FeaturesApplier, Modifier, RunConfig } from "./models/model";
export declare const createFeaturesApplier: <A extends readonly Applier[] = [], M extends readonly Modifier[] = [], R extends CreateRunners = () => [], H = Record<string, never>, C extends FeatureApplierCore = {
    readonly appliers: readonly [{
        readonly name: "hooks";
        readonly apply: (...hooks: ((props: any) => Record<string, unknown>)[]) => (Component: React.ComponentType<{}>) => (props: any) => JSX.Element;
    }, {
        readonly name: "HOCs";
        readonly apply: (...HOCs: ((Component: React.ComponentType<any>) => React.ComponentType<any>)[]) => (Component: React.ComponentType<any>) => any;
    }];
    readonly helpers: {
        readonly pipeline: typeof pipeline;
    };
    readonly modifiers: readonly [{
        readonly name: "filtered";
        readonly pickProps: (props_0: (...args: any[]) => unknown, ...args: any[]) => {
            modifierProps: ((...args: any[]) => unknown)[];
            nextProps: any[];
        };
        readonly apply: (filter: (...args: any[]) => unknown) => () => (Component: React.ComponentType<{}>, OriginComponent: React.ComponentType<{}>) => (props: any) => JSX.Element;
    }];
    readonly getRunners: <A_1 extends readonly Applier[], M_1 extends readonly Modifier[]>() => readonly [{
        readonly name: "sequential";
        readonly build: ({ helpers: { getCommonBuilder } }: {
            runConfig: RunConfig<import("./models/model").Runner<any>, Applier<any[]>, any[]>;
            setRunConfig: (nextRunConfig: Partial<RunConfig<import("./models/model").Runner<any>, Applier<any[]>, any[]>>) => void;
            builder: any;
            helpers: Record<string, Function> & {
                getCommonBuilder: (options?: import("./lib/create-common-builder").CommonBuilderProps) => any;
            };
        }) => import("./models/core/runners").SequentialBuilder<A_1, M_1>;
    }, {
        readonly name: "direct";
        readonly build: ({ helpers: { getCommonBuilder } }: {
            runConfig: RunConfig<import("./models/model").Runner<any>, Applier<any[]>, any[]>;
            setRunConfig: (nextRunConfig: Partial<RunConfig<import("./models/model").Runner<any>, Applier<any[]>, any[]>>) => void;
            builder: any;
            helpers: Record<string, Function> & {
                getCommonBuilder: (options?: import("./lib/create-common-builder").CommonBuilderProps) => any;
            };
        }) => import("./models/core/runners").DirectBuilder<A_1, M_1>;
        readonly editRunConfig: (runConfig: RunConfig<import("./models/model").Runner<any>, Applier<any[]>, any[]>) => {
            appliers: {
                args: any;
                modifiers: any[];
                item: Applier<any[]>;
            }[];
            runner: import("./models/model").Runner<any>;
        };
    }];
}, DR extends [...ReturnType<R>, ...ReturnType<C["getRunners"]>][number]["name"] = [...ReturnType<R>, ...ReturnType<C["getRunners"]>][0]["name"]>({ defaultRunner: outerDefaultRunner, appliers: outerAppliers, helpers: outerHelpers, modifiers: outerModifiers, getRunners: outerRunnersGetter, core: outerCore, processBuild, }?: {
    defaultRunner?: DR;
    appliers?: A;
    helpers?: H;
    modifiers?: M;
    getRunners?: R;
    core?: C;
    processBuild?: (runsConfig: RunConfig[]) => RunConfig[];
} & Record<string, boolean | string | number>) => FeaturesApplier<readonly [{
    readonly name: "sequential";
    readonly build: ({ helpers: { getCommonBuilder } }: {
        runConfig: RunConfig<import("./models/model").Runner<any>, Applier<any[]>, any[]>;
        setRunConfig: (nextRunConfig: Partial<RunConfig<import("./models/model").Runner<any>, Applier<any[]>, any[]>>) => void;
        builder: any;
        helpers: Record<string, Function> & {
            getCommonBuilder: (options?: import("./lib/create-common-builder").CommonBuilderProps) => any;
        };
    }) => import("./models/core/runners").SequentialBuilder<[...C["appliers"], ...A], [...C["modifiers"], ...M]>;
}, {
    readonly name: "direct";
    readonly build: ({ helpers: { getCommonBuilder } }: {
        runConfig: RunConfig<import("./models/model").Runner<any>, Applier<any[]>, any[]>;
        setRunConfig: (nextRunConfig: Partial<RunConfig<import("./models/model").Runner<any>, Applier<any[]>, any[]>>) => void;
        builder: any;
        helpers: Record<string, Function> & {
            getCommonBuilder: (options?: import("./lib/create-common-builder").CommonBuilderProps) => any;
        };
    }) => import("./models/core/runners").DirectBuilder<[...C["appliers"], ...A], [...C["modifiers"], ...M]>;
    readonly editRunConfig: (runConfig: RunConfig<import("./models/model").Runner<any>, Applier<any[]>, any[]>) => {
        appliers: {
            args: any;
            modifiers: any[];
            item: Applier<any[]>;
        }[];
        runner: import("./models/model").Runner<any>;
    };
}], DR, C["helpers"] & H>;
//# sourceMappingURL=apply-features.d.ts.map