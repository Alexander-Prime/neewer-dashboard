/** @jsxImportSource https://esm.sh/preact */

import { useState, useCallback, useEffect } from "preact/hooks";

import { Characteristics, Commands, Services } from "./neewer.ts";

type Props = {
  device: any;
};

export const ToggleDeviceButton = ({ device }: Props) => {
  const toggle = useToggleDevice(device);
  return <button onClick={toggle}>Toggle</button>;
};

const useToggleDevice = (device: any) => {
  const [char, setChar] = useState<any>(null);
  const [power, setPower] = useState(false);

  useEffect(() => {
    (async () => {
      const server = await device.gatt.connect();
      const service = await server.getPrimaryService(Services.CONTROL);
      setChar(await service.getCharacteristic(Characteristics.CONTROL));
    })();
    return () => setChar(null);
  }, [device]);

  const toggle = useCallback(async () => {
    if (char) {
      if (power) {
        await char.writeValue(Commands.POWER_OFF);
        setPower(false);
      } else {
        await char.writeValue(Commands.POWER_ON);
        setPower(true);
      }
    }
  }, [device, char, power, setPower]);

  return toggle;
};
