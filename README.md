# ![Features Applier](https://github.com/Alexei1999/features-applier/raw/master/media/logo.png)

**A React library that streamlines the development of complex components through modular enhancements.**

Features Applier simplifies the creation and maintenance of React components by providing a framework for modularly applying enhancements such as hooks and higher-order components (HOCs). This separation of concerns enhances both the development experience and component scalability.

## Installation

Install Features Applier using npm or Yarn:

```sh
npm install features-applier --save
# or
yarn add features-applier
```

## Usage

Enhance a React component by wrapping it with the applyFeatures function, which integrates specified enhancements:

### Example: Applying Multiple Enhancements

Consider a basic React component displaying a greeting. We will add a custom hook for appending text and an HOC for styling:

1. **Define the Basic Component**:

   ```typescript
   import React from "react";
   import { applyFeatures } from "features-applier";

   const Greeting = ({ message }) => <div>Hello, {message}</div>;
   ```

2. **Create a Higher-Order Component for Styling**:
   This HOC adds red color and increases the font size to 20px.

   ```typescript
   const withStyling = (Component) => (props) =>
     (
       <div style={{ color: "red", fontSize: "20px" }}>
         <Component {...props} />
       </div>
     );
   ```

3. **Develop a Custom Hook to Modify the Message**:
   This hook appends three exclamation marks to the message.

   ```typescript
   const useExcitedMessage = (props) => ({
     ...props,
     message: props.message + "!!!",
   });
   ```

4. **Apply Enhancements Using `applyFeatures`**:
   Combine the custom hook and HOC to enhance the Greeting component.

   ```typescript
   const EnhancedGreeting = applyFeatures((builder) => {
     builder
       .applyHooks(useExcitedMessage) // Applying the custom hook
       .applyHocs(withStyling); // Applying the HOC for styling
   })(Greeting);
   ```

5. **Use the Enhanced Component in Your Application**:

   ```typescript
   const App = () => (
     <div>
       <EnhancedGreeting message="World" />
     </div>
   );

   ReactDOM.render(<App />, document.getElementById("root"));
   ```

## Advanced Usage

### Creating your own `applyFeatures` instance

For projects requiring more advanced configuration, you can create a customized applier setup:

```typescript
import { createFeaturesApplier } from "features-applier";

const applyFeatures = createFeaturesApplier({
  defaultRunner: "direct", // Default method for feature application.
  appliers, // Enhance components with custom functionalities.
  helpers, // Auxiliary functions to facilitate feature applications.
  modifiers, // Apply features based on conditions.
  getRunners, // Fetch custom runner configurations.
  core, // Central management of all configurations.
  processBuild, // Tailor the compilation process of features.
});
```

This setup allows for more granular control over how features are applied, useful for large projects with complex component enhancement needs.

### Creating and Using Custom Appliers

In your project, appliers are structures that define specific ways to modify React components by applying a series of transformations. Each applier consists of a name and an apply function that, together, enable the encapsulation of complex logic into reusable enhancements for components.

#### Step 1: Define Your Applier Function

Here's how to define a custom applier based on the structure you've specified:

```typescript
const useTheme = (theme) => (props) => ({
  ...props,
  style: {
    ...props.style,
    color: theme.textColor,
    backgroundColor: theme.backgroundColor,
  },
});

export const customAppliers = [
  {
    name: "theme",
    apply:
      (...themes) =>
      (Component) => {
        const applyTheme = pipeline(...themes.map((theme) => useTheme(theme)));

        return (props: any) => {
          const themedProps = applyTheme(props);
          return <Component {...themedProps} />;
        };
      },
  },
];
```

#### Step 2: Integrate the Custom Applier

Once you've created your custom theme applier, you can use it in your React components to apply dynamic theming:

```typescript
const Button = ({ children, style }) => (
  <button style={style}>{children}</button>
);

// Applying the theme applier
const ThemedButton = applyFeatures((builder) => {
  builder.applyTheme({ textColor: "white", backgroundColor: "blue" });
})(Button);
```

In this example, applyTheme is used to wrap a Button component with a blue theme. This approach allows the Button to receive a dynamic theme as props, demonstrating how appliers can be used to enhance component reusability and separation of concerns.

### Creating and Using Custom Modifiers

Each modifier in your library is an object that encapsulates logic for picking and applying modifications based on dynamic conditions. A modifier typically includes:

- `name`: A string identifier for the modifier.
- `pickProps`: A function that processes input parameters to separate modifier-specific arguments from others.
- `apply`: A function that takes the arguments separated by `pickProps` and returns a function that applies a conditional modification to components.

#### Step 1: Define the Modifier

Let’s create a visibility modifier that conditionally displays a component based on a boolean condition.
Here's how to define a custom applier based on the structure you've specified:

```typescript
export const modifiers = [
  {
    name: "visibility",
    pickProps: (...props: [boolean]) => {
      const [isVisible] = props;
      return { modifierProps: [isVisible], nextProps: [] };
    },
    apply:
      (isVisible: boolean) => () => (EnhancedComponent, OriginalComponent) => {
        return (props) => {
          if (isVisible) {
            return <Component {...props} />;
          }

          return <OriginComponent {...props} />;
        };
      },
  },
];
```

In this example, the visibility modifier takes a boolean value to determine whether the component should be visible or not. If true, it renders the modified component; otherwise, it renders the original component.

#### Step 2: Integrate the Modifier with a Component

To use this custom modifier, integrate it into the application flow using the applyFeatures method:

```typescript
const withEnhance = (Component) => (props) =>
  (
    <div>
      <Component {...props} />
    </div>
  );

// Applying the visibility modifier
const ConditionallyVisibleComponent = applyFeatures((builder) => {
  builder.applyHocs.visibility(true).run(withEnhance);
})(Component);
```

This setup uses the visibility modifier to conditionally switch between enhanced component and original component based on the true condition. If you set it to false, it would render the original component.

### Creating and Using Custom Runners

Runners play a critical role in determining how features are applied to React components. They orchestrate the application of modifiers and appliers, providing a flexible mechanism for integrating enhancements in various ways. This section will guide you through creating your own custom runner.

#### Step 1: Define Your Runner

A runner is an object that needs to provide a build method and optionally a editRunConfig method, depending on the needs of your application. Here's the basic structure of a runner:

```typescript
interface Runner {
  name: string;
  build: (config: BuildConfig) => BuildFunction;
  editRunConfig?: (runConfig: RunConfig) => RunConfig;
}
```

- `name`: A unique identifier for the runner.
- `build`: A function that defines how the runner will process and apply features.
- `editRunConfig`: Optional. A function to modify the run configuration before execution.

#### Step 2: Implementing the Build Function

The build function is where you define the logic for applying features. This function will receive configuration parameters and should return a function that orchestrates the application of features.

```typescript
build: ({ helpers, appliers, modifiers }) => {
  // Logic to apply features to Component
  return builder;
};
```

#### Example: Creating a Conditional Runner

Let’s create a custom runner named "conditional" that applies features based on a specified condition.

```typescript
export const getRunners = () => [
  {
    name: "conditional",
    build: () => {
      return (condition, trueApplier, falseApplier) => {
        return (Component) => {
          const apply = condition ? trueApplier : falseApplier;
          return apply(Component);
        };
      };
    },
  },
];
```

In this example, the "conditional" runner checks a condition and chooses between two different appliers to modify the component.

#### Step 3: Using the Custom Runner

Once your runner is defined, you can use it to apply features to components as follows:

```typescript
export const ConditionalComponent = applyFeatures((builder) => {
  builder("conditional")(someCondition, applyWithRedColor, applyWithBlueColor);
})(Component);
```

This usage example shows how the "conditional" runner applies either applyWithRedColor or applyWithBlueColor based on the value of someCondition.

## More Examples

For more detailed examples and advanced usage scenarios, please see the files located in the `src/models/core` directory of this project.

Explore these examples to better understand how to leverage the full capabilities of our library in your applications.

## License (MIT)

Copyright
(c) 2024 Alexei1999, <https://github.com/Alexei1999/features-applier>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
