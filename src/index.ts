import { buildFeaturesApplier } from "./models/helpers/build-features-applier";

const core = buildFeaturesApplier.getDefaults();

const { applyFeatures, buildFeatures } = buildFeaturesApplier(
  core.defaultBuildParams
)
  .addPlugin(core.defaultPlugin)
  .createRunners(core.getDefaultRunners)
  .finish({
    defaultRunner: "direct",
  });

export { applyFeatures, buildFeatures, buildFeaturesApplier };
