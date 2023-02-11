import classNames from "classnames";

import { hash } from "~/signals/hash.ts";
import Button from "~/components/Button.tsx";

type Props = {
  className?: string;
};

export default ({ className }: Props) => (
  <div className={classNames("LightSettings", className)}>
    {hash.value &&
      (
        <div className="LightSettings-card">
          <header className="LightSettings-card-header">
            <Button onClick={() => hash.value = ""} iconName="close" />
            <h1>{hash}</h1>
          </header>
        </div>
      )}
  </div>
);
