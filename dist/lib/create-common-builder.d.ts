import { RunConfig, Builder, Applier, Modifier } from "../models/model";
type CommonProps = {
    builder: Builder;
    initApplier: (...args: any[]) => any;
};
type ModifierCommonProps = {
    modifiersMap: Record<string, any>;
} & CommonProps;
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
    setApplierHelpers?: () => any;
};
export declare const createCommonBuilder: ({ builder, appliers, modifiers, runConfig, setRunConfig, }: {
    builder: Builder;
    appliers: Applier[];
    modifiers: Modifier[];
    runConfig: RunConfig;
    setRunConfig: (nextRunConfig: Partial<RunConfig>) => void;
}) => ({ renameApplier, renameModifier, setModifierReturn, setModifierInit, setModifierHelpers, setApplierReturn, setApplierInit, setApplierHelpers, }?: CommonBuilderProps) => any;
export {};
//# sourceMappingURL=create-common-builder.d.ts.map