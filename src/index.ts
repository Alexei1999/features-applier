import { createFeaturesApplier } from "./apply-features";

const applyFeatures = createFeaturesApplier({
  defaultRunner: "direct",
});

export { applyFeatures, createFeaturesApplier };
