import React from "react";
export declare const appliers: [{
    readonly name: "hooks";
    readonly apply: (...hooks: ((props: any) => Record<string, unknown>)[]) => (Component: React.ComponentType<{}>) => (props: any) => React.JSX.Element;
}, {
    readonly name: "HOCs";
    readonly apply: (...HOCs: ((Component: React.ComponentType<any>) => React.ComponentType<any>)[]) => (Component: React.ComponentType<any>) => any;
}];
//# sourceMappingURL=appliers.d.ts.map