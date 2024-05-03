import React from "react";

import { pipeline } from "../../lib/pipeline";
import { Applier } from "../types/core";

export const appliers = [
  {
    name: "hooks",
    apply:
      (...hooks: ((props: any) => Record<string, unknown>)[]) =>
      (Component) => {
        const useHooks = pipeline(...hooks);

        return (props: any) => {
          const newProps = useHooks(props);
          return <Component {...newProps} />;
        };
      },
  },
  {
    name: "HOCs",
    apply: (
      ...HOCs: ((
        Component: React.ComponentType<any>
      ) => React.ComponentType<any>)[]
    ) => pipeline(...HOCs),
  },
] as const satisfies Applier[];
