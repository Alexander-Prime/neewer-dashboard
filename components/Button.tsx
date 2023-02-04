import classNames from "classnames";
import { ComponentChildren, JSX } from "preact";

import Icon, { IconName } from "~/components/Icon.tsx";

type Props = {
  children?: ComponentChildren;
  className?: string;
  iconName?: IconName;
  onClick?: JSX.HTMLAttributes<HTMLButtonElement>["onClick"];
};

export default ({ children, className, iconName, onClick }: Props) => (
  <button
    className={classNames("Button", { "mod-icon": iconName }, className)}
    onClick={onClick}
  >
    {iconName && <Icon className="Button-icon" name={iconName} />}
    {children}
  </button>
);
