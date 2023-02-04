import classNames from "classnames";
import { ComponentChildren } from "preact";

type Props = {
  children?: ComponentChildren;
  className?: string;
  onDismiss?: () => void;
  visible?: boolean;
};

export default ({ children, className, onDismiss, visible }: Props) => (
  <div
    onClick={onDismiss}
    className={classNames("Modal", { "is-visible": visible })}
  >
    <div
      onClick={(ev) => ev.stopPropagation()}
      className={classNames("Modal-window", className)}
    >
      {children}
    </div>
  </div>
);
