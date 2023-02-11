import classNames from "classnames";

import Light from "~/components/Light.tsx";
import { lights } from "~/signals/lights.ts";
import { hash } from "~/signals/hash.ts";

type Props = {
  className?: string;
};

export default ({ className }: Props) => (
  <div className={classNames("Radar", className)}>
    {Object.entries(lights.value).map(([id, { position: { x, y } }]) => (
      <div
        className="Radar-lightPositionWrapper"
        style={{ left: `calc(${x} * 100%)`, top: `calc(${y} * 100%)` }}
        onClick={() => hash.value = id}
      >
        <Light id={id} />
      </div>
    ))}
  </div>
);
