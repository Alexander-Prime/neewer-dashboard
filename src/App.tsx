/** @jsxImportSource https://esm.sh/preact */

import { useState } from "preact/hooks";

import { PickDeviceButton } from "./PickDeviceButton.tsx";
import { ToggleDeviceButton } from "./ToggleDeviceButton.tsx";

export const App = () => {
  const [device, setDevice] = useState<any>(null);
  console.log({ device });

  return (
    <>
      Hello, world!
      <PickDeviceButton prefix="NEEWER" onPick={setDevice} />
      {device && <ToggleDeviceButton device={device} />}
    </>
  );
};
