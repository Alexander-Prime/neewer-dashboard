/** @jsxImportSource https://esm.sh/preact */

import { ComponentChildren } from "preact";
import { useCallback } from "preact/hooks";

import { Services } from "./neewer.ts";

type Props = {
  prefix: string;
  onPick: (device: any) => void;
  children?: ComponentChildren;
};

export const PickDeviceButton = ({
  prefix,
  onPick,
  children = "Add a light",
}: Props) => {
  const pickDevice = useCallback(async () => {
    const device = await showDevicePicker(prefix);
    onPick(device);
  }, [prefix, onPick]);

  return <button onClick={pickDevice}>{children}</button>;
};

declare global {
  interface Navigator {
    // TODO find or include typing that do this for me hang on... did I already see this somewhere
    bluetooth: any;
  }
}

const showDevicePicker = (namePrefix: string) =>
  navigator.bluetooth.requestDevice({
    filters: [{ namePrefix }],
    optionalServices: Object.values(Services),
  });
