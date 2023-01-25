import classNames from "classnames";
import { ComponentChildren } from "preact";

type Props = {
  children?: ComponentChildren;
  className?: string;
};

export default ({ children, className }: Props) => (
  <button className={classNames("Button", className)}>{children}</button>
);
