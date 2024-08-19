import { Builder, BuildMethods, BuildMethodsConfig, RunConfig } from "../types/common";
import { Applier, Modifier } from "../types/core";
type CommonProps = {
    builder: Builder;
    initApplier: (...args: any[]) => any;
};
type ModifierCommonProps = {
    modifiersMap: Record<string, any>;
} & CommonProps;
export type ExtractBuildMethodsParams = {
    buildMethods: BuildMethodsConfig;
    setRunsConfig: (nextRunsConfig: RunConfig[]) => void;
    builder: Builder;
} & Omit<Parameters<BuildMethodsConfig[string]>[0], "editRunsConfigs">;
export type CommonBuilderProps = {
    renameApplier?: (name: string) => string;
    renameModifier?: (name: string) => string;
    setModifierReturn?: (props: ModifierCommonProps) => any;
    setModifierInit?: (props: ModifierCommonProps & {
        initModifier: (...args: any[]) => any;
    }) => any;
    setModifierHelpers?: (props: CommonProps) => any;
    setApplierReturn?: (props: {
        builder: Builder;
    }) => any;
    setApplierInit?: (props: ModifierCommonProps) => any;
    setApplierHelpers?: (props: {
        methods: BuildMethods<any, any>;
    }) => any;
    getMethods?: (options: ExtractBuildMethodsParams) => any;
};
export declare const createCommonBuilder: ({ builder, appliers, modifiers, runsConfig, runConfig, setRunConfig, setRunsConfig, buildMethods, }: {
    builder: Builder;
    appliers: Applier[];
    modifiers: Modifier[];
    runsConfig: RunConfig[];
    runConfig: RunConfig;
    setRunConfig: (nextRunConfig: Partial<RunConfig>) => void;
    setRunsConfig: (nextRunsConfig: RunConfig[]) => void;
    buildMethods: BuildMethodsConfig;
}) => ({ renameApplier, renameModifier, getMethods, setModifierReturn, setModifierInit, setModifierHelpers, setApplierReturn, setApplierInit, setApplierHelpers, }?: CommonBuilderProps) => any;
export {};
//# sourceMappingURL=create-common-builder.d.ts.map