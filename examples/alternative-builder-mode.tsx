import React from "react";
import { applyFeatures } from "./index";

const BasicComponent: React.ComponentType = ({ children }) => (
  <div>{children}</div>
);

const useEnhanceHook = (props) => {
  return { ...props };
};

const EnhancedComponent = applyFeatures((builder) => {
  builder("sequential")
    .applyHooks.filtered((props) => props.isAdmin)
    // @ts-expect-error
    .debounced(300)
    .throttled(500)
    // Applying enhancements now in the run function
    .run(useEnhanceHook);
})(BasicComponent);

export const App = () => <EnhancedComponent />;
