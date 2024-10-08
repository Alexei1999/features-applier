import React from "react";

import { Modifier } from "../types/core";

export const modifiers = [
  {
    priority: 100,
    name: "filtered",
    editProps: (...props: [(...args: any[]) => unknown, ...args: any[]]) => {
      const [filter, ...nextProps] = props;

      return { modifierProps: [filter], nextProps };
    },
    apply:
      (filter: (...args: any[]) => unknown) =>
      () =>
      (Component, OriginComponent) => {
        return (props: any) => {
          if (filter(props)) {
            return <Component {...props} />;
          }

          return <OriginComponent {...props} />;
        };
      },
  },
  {
    name: "fromRight",
    editProps: (...args: any[]) => {
      return { nextProps: args.reverse() };
    },
  },
] as const satisfies Modifier[];
