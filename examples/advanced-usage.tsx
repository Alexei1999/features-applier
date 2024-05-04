import React from "react";
import { applyFeatures } from "./index";

const UserComponent: React.ComponentType<{ user: string }> = ({
  user,
  children,
}) => (
  <div>
    Welcome, {user}! {children}
  </div>
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
export const App = () => (
  <EnhancedUserComponent isAuthenticated={true} user="Admin" />
);
