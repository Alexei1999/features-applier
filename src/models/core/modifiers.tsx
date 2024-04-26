import React from "react";

import { Modifier } from "../model";

export const modifiers = [
  {
    name: "filtered",
    pickProps: (...props: [(...args: any[]) => unknown, ...args: any[]]) => {
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
] as const satisfies Readonly<Modifier[]>;
