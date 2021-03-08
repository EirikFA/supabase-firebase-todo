/* eslint-disable no-param-reassign */
import envVars from "preact-cli-plugin-env-vars";

export default function (config, env, helpers) {
  envVars(config, env, helpers);
  config.resolve.alias.react = "preact/compat";
  config.resolve.alias["react-dom/test-utils"] = "preact/test-utils";
  config.resolve.alias["react-dom"] = "preact/compat";
}
