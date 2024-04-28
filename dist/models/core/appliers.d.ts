import React from "react";
export declare const appliers: readonly [{
    readonly name: "hooks";
    readonly apply: (...hooks: ((props: any) => Record<string, unknown>)[]) => (Component: React.ComponentType<{}>) => (props: any) => JSX.Element;
}, {
    readonly name: "hocs";
    readonly apply: (...hocs: ((Component: React.ComponentType<any>) => React.ComponentType<any>)[]) => (Component: React.ComponentType<any>) => any;
}];
//# sourceMappingURL=appliers.d.ts.map