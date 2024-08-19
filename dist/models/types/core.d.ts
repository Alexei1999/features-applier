import React from "react";
import { CreateApplierConfig, CreateModifierConfig } from "../../lib/common";
import { CommonBuilderProps } from "../helpers/create-common-builder";
import { Builder, ModifierRunContext, ModifierRunOptions, RunConfig } from "./common";
export type Applier<T extends any[] = any[]> = {
    name: string;
    apply: (...items: T) => (component: React.ComponentType) => React.ComponentType<any>;
};
export type Modifier<T extends any[] = any[]> = {
    name: string;
    priority?: number;
    editProps?: (...props: any[]) => {
        modifierProps?: T;
        nextProps: any[];
    };
    apply?: (...args: T) => (options: ModifierRunOptions, setContext: (nextContext: Partial<ModifierRunContext>) => void) => (component: React.ComponentType, originComponent: React.ComponentType) => React.ComponentType<any>;
};
export type Runner<T = any> = {
    readonly name: string;
    build: (options: {
        runConfig: RunConfig;
        setRunConfig: (nextRunConfig: Partial<RunConfig>) => void;
        builder: Builder;
        helpers: Record<string, (...args: any[]) => unknown> & {
            getCommonBuilder: (options?: CommonBuilderProps) => any;
            createApplierConfig: CreateApplierConfig;
            createModifierConfig: CreateModifierConfig;
        };
    }) => T;
    editRunConfig?: (runConfig: RunConfig) => RunConfig;
};
export type CommonFeaturesMethodsOptions = {
    defaultRunner?: string;
};
export type FeatureApplierCreateBuilderOptions = {
    defaultRunner: string;
};
export type FeatureApplierOptions = CommonFeaturesMethodsOptions & {
    processBuild?: (runsConfig: RunConfig[]) => RunConfig[];
};
export type FeatureApplierBuilderOptions = CommonFeaturesMethodsOptions;
//# sourceMappingURL=core.d.ts.map