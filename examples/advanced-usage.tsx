import React from "react";
import { applyFeatures } from "../src";

const UserComponent: React.ComponentType<{ user: string }> = ({ user }) => (
  <div>Welcome, {user}!</div>
);

const useAdminFeatures = (props) => {
  return { ...props, adminProp: "Admin features active" };
};
const withAuthentication = (Component) => (props) => {
  return props.isAuthenticated ? (
    <Component {...props} />
  ) : (
    <div>Please log in</div>
  );
};

// Enhance the component conditionally
const EnhancedUserComponent = applyFeatures<{ isAuthenticated: boolean }>(
  (builder) => {
    builder
      // Always apply the authentication HOC
      .applyHOCs(withAuthentication)
      // Conditionally apply the admin hook
      // based on the condition in the first argument
      .applyHooks.filtered((props) => props.user === "Admin", useAdminFeatures);
  }
)(UserComponent);

// Usage of the enhanced component
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const App = () => <EnhancedUserComponent isAuthenticated={true} user="Admin" />;
