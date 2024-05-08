import { buildFeaturesApplier } from "./models/helpers/build-features-applier";

const core = buildFeaturesApplier.getDefaults();

const applyFeatures = buildFeaturesApplier()
  .addPlugin(core.defaultPlugin)
  .createRunners(core.getDefaultRunners)
  .finish({
    defaultRunner: "direct",
  });

export { applyFeatures, buildFeaturesApplier };
