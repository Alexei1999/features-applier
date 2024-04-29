import { CreateRunners } from "../models/model";
/**
 * Builder is an proxy, should be always the first argument of mergeWithDescriptors
 */
export declare const mergeWithDescriptors: <T extends {}, S extends {}[]>(target: T, ...sources: S) => T;
export type MergeRunners<T1 extends CreateRunners, T2 extends CreateRunners> = [
    ...ReturnType<T1>,
    ...ReturnType<T2>
];
export declare const capitalize: (str?: string, lowerRest?: boolean) => string;
//# sourceMappingURL=common.d.ts.map