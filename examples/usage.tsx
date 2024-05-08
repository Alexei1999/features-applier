import React from "react";
import { applyFeatures } from "../src";

// Define a simple component that displays a message
const GreetingComponent = ({ name, greeting, ...props }) => (
  <div {...props}>
    {greeting}, {name}!
  </div>
);

// Define a hook that adds greeting
// time based on the current hour to the props
const useTimeOfDayGreeting = (props) => {
  const hour = new Date().getHours();
  const timeOfDay = hour < 12 ? "Morning" : hour < 18 ? "Afternoon" : "Evening";
  return { ...props, greeting: `Good ${timeOfDay}` };
};

// Define a HOC that adds styling to the component
const withStyling = (Component) => (props) =>
  <Component {...props} style={{ color: "blue", fontWeight: "bold" }} />;

// Apply enhancements to the GreetingComponent using applyFeatures
const EnhancedGreetingComponent = applyFeatures<{ greeting: never }>(
  (builder) => {
    builder.applyHOCs(withStyling).applyHooks(useTimeOfDayGreeting);
  }
)(GreetingComponent);

// Usage in your application
// @ts-ignore
const App = () => <EnhancedGreetingComponent name="Username" />;
