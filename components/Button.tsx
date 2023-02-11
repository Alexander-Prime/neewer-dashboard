import classNames from "classnames";
import { ComponentChildren, JSX } from "preact";

import Icon, { IconName } from "~/components/Icon.tsx";

type Props = {
  children?: ComponentChildren;
  className?: string;
  iconName?: IconName;
  onClick?: JSX.HTMLAttributes<HTMLButtonElement>["onClick"];
  raised?: boolean;
};

export default ({ children, className, iconName, onClick, raised }: Props) => (
  <button
    className={classNames("Button", {
      "mod-icon": iconName,
      "mod-text": children,
      "mod-raised": raised,
    }, className)}
    onClick={onClick}
  >
    {iconName && <Icon className="Button-icon" name={iconName} />}
    {children}
  </button>
);
