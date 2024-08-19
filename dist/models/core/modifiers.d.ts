import React from "react";
export declare const modifiers: [{
    readonly priority: 100;
    readonly name: "filtered";
    readonly editProps: (props_0: (...args: any[]) => unknown, ...args: any[]) => {
        modifierProps: ((...args: any[]) => unknown)[];
        nextProps: any[];
    };
    readonly apply: (filter: (...args: any[]) => unknown) => () => (Component: React.ComponentType<{}>, OriginComponent: React.ComponentType<{}>) => (props: any) => JSX.Element;
}, {
    readonly name: "fromRight";
    readonly editProps: (...args: any[]) => {
        nextProps: any[];
    };
}];
//# sourceMappingURL=modifiers.d.ts.map