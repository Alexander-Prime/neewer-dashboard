import classNames from "classnames";
import { useEffect, useState } from "preact/hooks";
import { useComputed, useSignal } from "@preact/signals";

import { hash } from "~/signals/hash.ts";
import Button from "~/components/Button.tsx";
import Switch from "~/components/Switch.tsx";
import Slider from "../components/Slider.tsx";

type Props = {
  className?: string;
};

export default ({ className }: Props) => {
  const timeoutHash = useSignal(globalThis.location?.hash.slice(1));
  useEffect(() => {
    setTimeout(() => timeoutHash.value = hash.value, 1000);
  }, [
    hash.value,
  ]);
  const deferredHash = useComputed(() => hash.value || timeoutHash.value);

  const [brightness, setBrightness] = useState(0);
  const [hue, setHue] = useState(0);

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
        <ul className="LightSettings-card-controls">
          <li className="LightSettings-card-controls-item">
            <Switch label="On / Off" onChange={console.log} />
          </li>
          <li className="LightSettings-card-controls-item">
            <Slider
              label="Brightness"
              onInput={setBrightness}
            />
          </li>
          <li className="LightSettings-card-controls-item">
            <Slider
              label="Hue"
              onInput={setHue}
              fillColor="transparent"
              trackBackground={`linear-gradient(
                in hsl increasing hue to right,
                hsl(0, 100%, ${brightness / 2}%),
                hsl(359.9999deg, 100%, ${brightness / 2}%)
              )`}
            />
          </li>

          <li className="LightSettings-card-controls-item">
            <Slider
              label="Saturation"
              onChange={console.log}
              fillColor={`hsl(${hue / 100 * 360}deg, 100%, ${brightness / 2}%)`}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};
