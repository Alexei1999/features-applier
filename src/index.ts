import { createFeaturesApplier } from "./create-features-applier";

const applyFeatures = createFeaturesApplier({
  defaultRunner: "direct",
});

export { applyFeatures, createFeaturesApplier };
