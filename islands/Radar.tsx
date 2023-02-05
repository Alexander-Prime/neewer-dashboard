import classNames from "classnames";

import Light from "~/components/Light.tsx";
import { lights } from "~/signals/lights.ts";

type Props = {
  className?: string;
};

export default ({ className }: Props) => (
  <div className={classNames("Radar", className)}>
    {lights.value.map(({ ref, position: { x, y } }) => (
      <div
        className="Radar-lightPositionWrapper"
        style={{ left: `calc(${x} * 100%)`, top: `calc(${y} * 100%)` }}
      >
        <Light id={ref} />
      </div>
    ))}
  </div>
);
