declare global {
  interface Navigator {
    bluetooth?: {
      requestDevice: (
        _: { filters: unknown[]; optionalServices: unknown[] },
      ) => Promise<BluetoothDevice>;
    };
  }
}

type BluetoothDevice = {
  gatt: Gatt;
};

type Gatt = { connect: () => Promise<Server> };
type Server = { getPrimaryService: (_: unknown) => Promise<Service> };
type Service = {
  uuid: string;
  getCharacteristics: () => Promise<Characteristic[]>;
  getCharacteristic: (_: unknown) => Promise<Characteristic>;
};
type Characteristic = {
  uuid: string;
  writeValue: (_: unknown) => Promise<void>;
  readValue: () => Promise<{ buffer: ArrayBufferLike }>;
};

const Services = {
  UNKNOWN_A: 0x1800,
  UNKNOWN_B: 0x1801,
  CONTROL: "69400001-b5a3-f393-e0a9-e50e24dcca99",
  UNKNOWN_D: "7f510004-b5a3-f393-e0a9-e50e24dcca9e",
};

const Characteristics = {
  CONTROL: "69400002-b5a3-f393-e0a9-e50e24dcca99",
};

const Commands = {
  POWER_ON: Uint8Array.of(0x78, 0x81, 0x01, 0x01, 0xfb),
  POWER_OFF: Uint8Array.of(0x78, 0x81, 0x01, 0x02, 0xfc),
};

const bufferToString = (buf: ArrayBufferLike) =>
  `[ ${
    [...new Uint8Array(buf)]
      .map((n) => n.toString(16).padStart(2, "0"))
      .join(" ")
  } ]`;

const logAllCharacteristics = async (gattServer: Server) => {
  for (const serviceId of Object.values(Services)) {
    const service = await gattServer.getPrimaryService(serviceId);
    console.group(`Service ${service.uuid}`);
    try {
      for (const characteristic of await service.getCharacteristics()) {
        console.log(
          characteristic.uuid,
          bufferToString((await characteristic.readValue()).buffer),
        );
      }
    } catch {
      console.log("(empty)");
    } finally {
      console.groupEnd();
    }
  }
};

export const getBluetoothDevices = async (): Promise<LightDevice[]> => {
  if (!navigator.bluetooth) {
    throw new Error("Can't access bluetooth API");
  }
  const device = await navigator.bluetooth.requestDevice({
    filters: [{ namePrefix: "NEEWER" }],
    optionalServices: Object.values(Services),
  });

  const server = await device.gatt.connect();

  await logAllCharacteristics(server);

  const service = await server.getPrimaryService(Services.CONTROL);
  const characteristic = await service.getCharacteristic(
    Characteristics.CONTROL,
  );
  await characteristic.writeValue(Commands.POWER_OFF);
  console.log(bufferToString((await characteristic.readValue()).buffer));
  await new Promise((res) => setTimeout(res, 1000));
  await characteristic.writeValue(Commands.POWER_ON);
  console.log(bufferToString((await characteristic.readValue()).buffer));

  return [];
};

export type LightDevice = {
  id: string;
  getProperties: () => Promise<unknown[]>;
};

export const LightDevice = {
  fromRef: (ref: string): LightDevice => ({
    id: ref,
    getProperties: ref.startsWith("test")
      ? () => Promise.resolve([])
      : async () => {
        await null;
        return [];
      },
  }),
};
