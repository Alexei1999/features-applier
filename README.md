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
  - [Creating Reusable Features](#creating-reusable-features)
  - [Advanced Customization](#advanced-customization)
  - [Example: Creating a Custom Runner](#example-creating-a-custom-runner)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction

Features Applier is based on a systematic approach designed to enhance the development of complex React components. It emphasizes modularity, scalability and maintainability, ensuring that components are robust and adaptable.

### Key Concepts of Features Applier

- **Modular Design** - each component is constructed as a self-contained unit with its own set of responsibilities and interfaces. This allows components to be easily managed, tested, and reused across different parts of an application or in different projects.
- **Separation of Concerns** - distinctly separates the visual representation (UI) from the business logic (UX/logic layer) within components. This separation simplifies management and enhances the clarity of both the component’s design and its operational logic.
- **Composability** - Leverages High Order Components (HOCs) and React Hooks to enhance and extend the functionalities of components. This approach allows new features to be layered onto existing components without altering their underlying structure.

## Installation

Prerequisites:

- React 16.8 or higher
- Node.js 12.х or higher
- TypeScript 4.9 or higher

You can use any package manager:

```sh
npm add features-applier
```

## Usage

Below is an example of how to apply some features to a React component:

```typescript
import { applyFeatures } from "features-applier";

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
const App = () => <EnhancedGreetingComponent name="Username" />;

render(<App />, document.getElementById("root"));
```

Expected output in your application as follows:

```html
<div id="root">
  <div style="color: blue; font-weight: bold">Good Morning, Username!</div>
</div>
```

## Advanced Usage

Features Applier includes these APIs

- `applyFeatures()`: powerful tool for enhancing components by applying specified features. It provides a structured way to integrate enhancements such as hooks and higher-order components (HOCs).
- `buildFeatures()`: utility function that helps to encapsulate and modularize enhancements. This function is particularly useful for creating reusable feature sets that can be applied across different components within an application.
- `buildFeaturesApplier()`: builder method that allows to assemble any set of `appliers`, `modifiers`, and `builder` behaviors, allowing for extensive customization of how features are applied. Can serve as a foundational tool for building adaptable and scalable feature applications, accommodating a wide array of application needs beyond standard React component enhancement.

### Conditional Feature Application

Using `filtered` modifier, you can dynamically apply hooks and HOCs based on the props or the component's state:

```typescript
const UserComponent = ({ user }) => <div>Welcome, {user}!</div>;

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
const App = () => <EnhancedUserComponent isAuthenticated={true} user="Admin" />;
```

### Alternative Builder Mode

The `builder` supports an alternative mode of applying modifiers that is especially beneficial for integrating complex modifications logic by chaining multiple modifiers in an explicit order.

```typescript
const EnhancedComponent = applyFeatures((builder) => {
  builder("sequential")
    .applyHooks.filtered((props) => props.isAdmin)
    .debounced(300)
    .throttled(500)
    // Applying enhancements now in the run function
    .run(useEnhanceHook);
})(BasicComponent);
```

> **Note:** The modifiers `debounced` and `throttled` are conceptual illustrations and not implemented in the current version of Features Applier. You can add it on your own; see [Advanced Customization](#advanced-customization) for more information

### Creating Reusable Features

You can use `buildFeatures` to create standalone features that encapsulate specific enhancements, such as higher-order components (HOCs) or hooks. These feature sets can then be applied to components through `applyFeatures`.

```javascript
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

// Build reusable styling feature
const styling = buildFeatures((builder) => {
  builder.applyHOCs(withStyling);
});

// Apply enhancements to the GreetingComponent
const EnhancedGreetingComponent =
  applyFeatures <
  { greeting: never } >
  ((builder) => {
    builder.use(styling).applyHooks(useTimeOfDayGreeting);
  })(GreetingComponent);

// Usage in your application
const App = () => <EnhancedGreetingComponent name="Username" />;
```

### Advanced Customization

The `buildFeaturesApplier` method allows you to set up a custom feature application environment by defining custom `runners`, `appliers` and `modifiers`. This setup can be aligned with unique project requirements, enabling a more granular control over how features are applied across various elements.

Here’s how to create a custom instance of `applyFeatures` using `buildFeaturesApplier` to provide specific behavior that is not covered by the default setup:

```typescript
import { createFeaturesApplier } from "features-applier";

// Custom configuration for a features applier
const { applyFeatures: customApplyFeatures } = buildFeaturesApplier()
  .addModifiers(/* Custom modifiers */)
  .addAppliers(/* Custom appliers */)
  .addHelpers({
    /* Custom functions */
  })
  .createRunners(() => [
    /* Custom runners logic */
  ])
  .finish({
    defaultRunner: "direct",
  });
```

### Example: Creating a Custom Runner

Let's create a custom runner:

```typescript
import { buildFeaturesApplier } from "features-applier";

const getCustomRunners = () =>
  [
    {
      name: "simple",
      build: ({
        builder,
        runConfig,
        setRunConfig,
        helpers: { createApplierConfig },
      }) => {
        type SimpleBuilder = {
          applyAny: (...items: any[]) => SimpleBuilder;
        };

        return {
          applyAny: (...items: any[]) => {
            setRunConfig({
              appliers: [
                ...runConfig.appliers,
                createApplierConfig(
                  {
                    name: "any",
                    apply: pipeline,
                  },
                  {
                    params: items,
                  }
                ),
              ],
            });

            // Return the builder for chaining
            return builder;
          },
        } as SimpleBuilder;
      },
    },
  ] as const;

const core = buildFeaturesApplier.getDefaults();

const { applyFeatures } = buildFeaturesApplier()
  .addPlugin(core.defaultPlugin)
  .createRunners(getCustomRunners)
  .finish();
```

Now, you can use your simple runner as follows:

```typescript
const useRawEnhancement = (Component) => (props) => {
  return <Component {...props} />;
};

const EnhancedComponent = applyFeatures((builder) => {
  builder("simple").applyAny(useRawEnhancement);
})(BasicComponent);
```

For more detailed examples, please see the [src/models/core](https://github.com/Alexei1999/features-applier/raw/master/src/models/core) directory of this project.
