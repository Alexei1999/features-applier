import React from "react";
import { buildFeaturesApplier } from "../src";
import { pipeline } from "../src/lib/pipeline";
import { CreateRunners } from "../src/models/types/common";

const BasicComponent: React.ComponentType<{ children?: React.ReactNode }> = ({
  children,
}) => <div>{children}</div>;

const getCustomRunners = (() =>
  [
    {
      name: "simple",
      build: ({
        builder,
        runConfig,
        setRunConfig,
        helpers: { createApplierConfig },
      }) => {
        type SimpleBuilder = {
          applyAny: (...items: any[]) => SimpleBuilder;
        };

        return {
          applyAny: (...items: any[]) => {
            setRunConfig({
              appliers: [
                ...runConfig.appliers,
                createApplierConfig(
                  {
                    name: "any",
                    apply: pipeline,
                  },
                  {
                    params: items,
                  }
                ),
              ],
            });

            // Return the builder for chaining
            return builder;
          },
        } as SimpleBuilder;
      },
    },
  ] as const) satisfies CreateRunners;

const core = buildFeaturesApplier.getDefaults();

const applyFeatures = buildFeaturesApplier()
  .addPlugin(core.defaultPlugin)
  .createRunners(getCustomRunners)
  .finish();

const useRawEnhancement = (Component) => (props) => {
  return <Component {...props} />;
};

const EnhancedComponent = applyFeatures((builder) => {
  builder("simple").applyAny(useRawEnhancement);
})(BasicComponent);

// @ts-ignore
const App = () => <EnhancedComponent />;
