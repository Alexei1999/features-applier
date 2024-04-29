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
const useProp = (m: "!" | "!!" | "!!!") => (props: ComponentProps) => {
  return { ...props, w: "World" + m };
};

export const DefaultBuilderExample = applyFeatures((builder) => {
  builder
    .applyHooks(useProp("!"))
    .applyHOCs.filtered(() => true, WithRedColor, WithUnderline);
})(Component);

export const DirectBuilderExample = applyFeatures((builder) => {
  builder("direct")
    .applyHooks(useProp("!!"))
    .applyHOCs.filtered(
      (props) => props.admin === "access-granted",
      WithRedColor,
      WithUnderline
    );
})(Component);

export const SequentialBuilderExample = applyFeatures((builder) => {
  builder("sequential")
    .applyHooks(useProp("!!!"))
    .applyHOCs.filtered(() => false)
    .run(WithRedColor, WithUnderline);
})(Component);
