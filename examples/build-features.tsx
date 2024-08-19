import React from "react";
import { applyFeatures, buildFeatures } from "../src";

const GreetingComponent = ({ name, greeting, ...props }) => (
  <div {...props}>
    {greeting}, {name}!
  </div>
);

const useTimeOfDayGreeting = (props) => {
  const hour = new Date().getHours();
  const timeOfDay = hour < 12 ? "Morning" : hour < 18 ? "Afternoon" : "Evening";
  return { ...props, greeting: `Good ${timeOfDay}` };
};

const withStyling = (Component) => (props) =>
  <Component {...props} style={{ color: "blue", fontWeight: "bold" }} />;

const styling = buildFeatures((builder) => {
  builder.applyHOCs(withStyling);
});

const EnhancedGreetingComponent = applyFeatures<{ greeting: never }>(
  (builder) => {
    builder.use(styling).applyHooks(useTimeOfDayGreeting);
  }
)(GreetingComponent);

// Usage in your application
// @ts-ignore
const App = () => <EnhancedGreetingComponent name="Username" />;
