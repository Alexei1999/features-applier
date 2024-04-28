# ![Features Applier](https://github.com/Alexei1999/features-applier/raw/master/media/logo.png)

**A React library that streamlines the development of complex React components through modularity, composability and maintainability.**

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Introduction](#introduction)
  - [Key Concepts of Features Applier](#key-concepts-of-features-applier)
- [Installation](#installation)
- [Usage](#usage)
- [Advanced Usage](#advanced-usage)
  - [Conditional Feature Application](#conditional-feature-application)
  - [Alternative Builder Mode](#alternative-builder-mode)
  - [Advanced Customization](#advanced-customization)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction

Features Applier is based on a systematic approach designed to enhance the development of complex React components. It emphasizes modularity, scalability, and maintainability, ensuring that components are robust and adaptable.

### Key Concepts of Features Applier

- **Modular Design** - each component is constructed as a self-contained unit with its own set of responsibilities and interfaces. This allows components to be easily managed, tested, and reused across different parts of an application or in different projects.
- **Separation of Concerns** - distinctly separates the visual representation (UI) from the business logic (UX/logic layer) within components. This separation simplifies management and enhances the clarity of both the component’s design and its operational logic.
- **Composability** - Leverages High Order Components (HOCs) and React Hooks to enhance and extend the functionalities of components. This approach allows new features to be layered onto existing components without altering their underlying structure.

## Installation

> You can use any package manager

```sh
npm add features-applier
```

## Usage

```typescript
import { applyFeatures } from "features-applier";
import React from "react";

// Define your base component
const BasicComponent = (props) => (
  <div {...props}>Hello, Features Applier!</div>
);

// Define hooks and HOCs providing some enhancements
const useCustomHook = (props) => ({ ...props, id: "hookId" });
const withHigherOrder = (Component) => (props) =>
  <Component {...props} className="hocClassName" />;

// Apply them to your component using applyFeatures
const EnhancedComponent = applyFeatures((builder) => {
  builder
    .applyHooks(useCustomHook) // Apply custom hook
    .applyHOCs(withHigherOrder); // Apply HOC
})(BasicComponent);

// Usage in your application
const App = () => <EnhancedComponent />;
```

Below is an illustration of the component after applying the enhancements provided by `features-applier`:

<img src="https://github.com/Alexei1999/features-applier/raw/master/media/example-screenshot.png" alt="example-screenshot" width="500" />

## Advanced Usage

Features Applier includes these APIs

- `applyFeatures()`: powerful tool for enhancing components by applying specified features. It provides a structured way to integrate enhancements such as hooks and higher-order components (HOCs).
- `createFeaturesApplier()`: versatile factory method that allows to assemble any set of appliers, modifiers, and builder behaviors, allowing for extensive customization of how features are applied. Can serve as a foundational tool for building adaptable and scalable feature applications, accommodating a wide array of application needs beyond standard React component enhancement.

### Conditional Feature Application

Using conditional logic, you can dynamically apply hooks and HOCs based on the props or the component's state. This is particularly useful for features that should only be active under specific conditions, such as user permissions or application states.

```typescript
const UserComponent = ({ user, children }) => (
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
const EnhancedUserComponent = applyFeatures((builder) => {
  builder
    // Always apply the authentication HOC
    .applyHooks(withAuthentication)
    // Conditionally apply the admin hook
    .applyHOCs.filtered((props) => props.user === "Admin", useAdminFeatures);
})(UserComponent);

// Usage of the enhanced component
const App = () => <EnhancedUserComponent isAuthenticated={true} user="Admin" />;
```

### Alternative Builder Mode

The `builder` supports an alternative mode that is especially beneficial for integrating complex modifications logic. This mode, using the `"sequential"` runner, allows for precise feature application by chaining multiple modifiers in an explicit order.

```typescript
const EnhancedComponent = applyFeatures((builder) => {
  builder("sequential")
    .applyHooks.filtered((props) => props.isAdmin) // Check if the user is an admin
    .debounced(300) // Debounce modifier to avoid rapid re-executions
    .throttled(500) // Throttle modifier to limit how often it can run
    .run(useEnhanceHook); // Apply enhances
})(BasicComponent);
```

> **Note:** The modifiers `debounced` and `throttled` are conceptual illustrations and not implemented in the current version of Features Applier. You can add it on your own; see [Advanced Customization](#advanced-customization) for more information

### Advanced Customization

The `createFeaturesApplier` allows you to set up a custom feature application environment by defining custom `runners`, `appliers` and `modifiers`. This setup can be aligned with unique project requirements, enabling a more granular control over how features are applied across different applicants.

Here’s how to create a custom instance of `applyFeatures` using `createFeaturesApplier` to provide specific behavior that is not covered by the default setup:

```typescript
import { createFeaturesApplier } from "features-applier";

// Custom configuration for a features applier
const customApplyFeatures = createFeaturesApplier({
  defaultRunner: "direct", // Define the default runner
  appliers: [
    /* Custom appliers */
  ],
  modifiers: [
    /* Custom modifiers */
  ],
  getRunners: () => [
    /* Custom runners logic */
  ],
  helpers: {
    /* Custom functions that will be available throughout the applyFeatures */
  },
  core: {
    /* Default set runners, appliers and modifiers */
  },
});
```

For more detailed examples of using `createFeaturesApplier` please see the files in the `src/models/core` directory of this project.
