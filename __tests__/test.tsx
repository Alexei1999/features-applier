import React from "react";
import { applyFeatures } from "../src";

type ComponentProps = { w: "World" };
const Component = ({ w }: ComponentProps) => {
  return <span>Hello {w}</span>;
};
const WithRedColor =
  (Component: React.ComponentType<ComponentProps>) => (props: ComponentProps) =>
    (
      <span style={{ color: "red" }}>
        <Component {...props} />
      </span>
    );
const WithUnderline =
  (Component: React.ComponentType<ComponentProps>) => (props: ComponentProps) =>
    (
      <span style={{ textDecoration: "underline" }}>
        <Component {...props} />
      </span>
    );
const useProp = (m: "!") => (props: ComponentProps) => {
  return { ...props, w: "World" + m };
};

export const ApplyFeaturesTestComponent = applyFeatures<
  Record<string, unknown>,
  Record<string, unknown>
>((builder) => {
  builder("direct").applyHocs.filtered(() => true, WithRedColor, WithUnderline);
})(Component);
