import classNames from "classnames";
import Light from "~/components/Light.tsx";
import { lights } from "~/signals/lights.ts";

type Props = {
  className?: string;
};

export default ({ className }: Props) => (
  <div className={classNames("Radar", className)}>
    {lights.value.map(({ ref }) => <Light id={ref} />)}
  </div>
);
