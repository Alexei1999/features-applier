import React from "react";
import { CommonBuilderProps } from "../helpers/create-common-builder";
import { ModifierRunOptions, ModifierRunContext, RunConfig, Builder } from "./common";
export type Applier<T extends any[] = any[]> = {
    name: string;
    apply: (...items: T) => (component: React.ComponentType) => React.ComponentType<any>;
};
export type Modifier<T extends any[] = any[]> = {
    name: string;
    priority?: number;
    pickProps?: (...props: any[]) => {
        modifierProps?: T;
        nextProps: any[];
    };
    apply: (...props: T) => (options: ModifierRunOptions, setContext: (nextContext: Partial<ModifierRunContext>) => void) => (component: React.ComponentType, originComponent: React.ComponentType) => React.ComponentType<any>;
};
export type Runner<T = any> = {
    readonly name: string;
    build: (options: {
        runConfig: RunConfig;
        setRunConfig: (nextRunConfig: Partial<RunConfig>) => void;
        builder: Builder;
        helpers: Record<string, Function> & {
            getCommonBuilder: (options?: CommonBuilderProps) => any;
        };
    }) => T;
    editRunConfig?: (runConfig: RunConfig) => RunConfig;
};
//# sourceMappingURL=core.d.ts.map