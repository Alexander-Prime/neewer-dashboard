import classNames from "classnames";
import { ComponentChildren } from "preact";

import Icon, { IconName } from "~/components/Icon.tsx";

type Props = {
  children?: ComponentChildren;
  className?: string;
  iconName?: IconName;
};

export default ({ children, className, iconName }: Props) => (
  <button className={classNames("Button", { "mod-icon": iconName }, className)}>
    {iconName && <Icon className="Button-icon" name={iconName} />}
    {children}
  </button>
);
