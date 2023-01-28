import classNames from "classnames";
import Light from "~/components/Light.tsx";

type Props = {
  className?: string;
};

export default ({ className }: Props) => (
  <div
    className={classNames("Radar", className)}
    onPointerMove={console.log}
  >
    <Light />
  </div>
);
