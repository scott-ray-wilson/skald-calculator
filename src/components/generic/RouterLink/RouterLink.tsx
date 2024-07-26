import {
  Link as AriaLink,
  LinkProps as AriaLinkProps,
} from "react-aria-components";
import { LinkProps as RouterLinkProps } from "@tanstack/react-router";

export type RouterPath = RouterLinkProps["to"];

type LinkProps = Omit<AriaLinkProps, "href"> & {
  to?: RouterPath;
};

export const RouterLink = ({ to, ...props }: LinkProps) => {
  return <AriaLink href={to} {...props} />;
};
