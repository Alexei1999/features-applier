import React from "react";

import { pipeline } from "../../lib/pipeline";
import { Applier } from "../model";

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
    name: "hocs",
    apply: (
      ...hocs: ((
        Component: React.ComponentType<any>
      ) => React.ComponentType<any>)[]
    ) => pipeline(...hocs),
  },
] as const satisfies Readonly<Applier[]>;
