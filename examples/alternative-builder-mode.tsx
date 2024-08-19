import React from "react";
import { applyFeatures } from "../src";

const BasicComponent: React.ComponentType = ({
  children,
}: {
  children?: React.ReactNode;
}) => <div>{children}</div>;

const useEnhanceHook = (props) => {
  return { ...props };
};

const EnhancedComponent = applyFeatures((builder) => {
  builder("sequential")
    .applyHooks.filtered((props) => props.isAdmin)
    // @ts-expect-error modifier does not exist
    .debounced(300)
    .throttled(500)
    // Applying enhancements now in the run function
    .run(useEnhanceHook);
})(BasicComponent);

// @ts-ignore
const App = () => <EnhancedComponent />;
