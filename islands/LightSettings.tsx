import classNames from "classnames";
import { useEffect } from "preact/hooks";
import { useComputed, useSignal } from "@preact/signals";

import { hash } from "~/signals/hash.ts";
import Button from "~/components/Button.tsx";

type Props = {
  className?: string;
};

export default ({ className }: Props) => {
  const timeoutHash = useSignal(location?.hash.slice(1));
  useEffect(() => {
    setTimeout(() => timeoutHash.value = hash.value, 1000);
  }, [
    hash.value,
  ]);
  const deferredHash = useComputed(() => hash.value || timeoutHash.value);

  return (
    <div className={classNames("LightSettings", className)}>
      <div
        className={classNames("LightSettings-card", {
          "is-visible": hash.value,
        })}
      >
        <header className="LightSettings-card-header">
          <Button
            onClick={() => hash.value = ""}
            iconName="close"
          />
          <h1>{deferredHash.value}</h1>
        </header>
      </div>
    </div>
  );
};
