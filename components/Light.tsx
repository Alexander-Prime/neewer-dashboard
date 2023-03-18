import classNames from "classnames";
import { lights } from "~/signals/lights.ts";
import Icon from "./Icon.tsx";

type Props = {
  className?: string;
  id: string;
};

export default ({ className, id }: Props) => (
  <div
    className={classNames("Light", className)}
    id={id}
    style={{
      left: lights.value[id]?.position.x,
      top: lights.value[id]?.position.y,
    }}
  >
    <Icon name="bulb" />
  </div>
);
