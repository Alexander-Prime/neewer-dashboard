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

const bufferToString = (buf) =>
  `[ ${[...new Uint8Array(buf)]
    .map((n) => n.toString(16).padStart(2, "0"))
    .join(" ")} ]`;

const logAllCharacteristics = async (gattServer) => {
  for (const serviceId of Object.values(Services)) {
    const service = await gattServer.getPrimaryService(serviceId);
    console.group(`Service ${service.uuid}`);
    try {
      for (const characteristic of await service.getCharacteristics()) {
        console.log(
          characteristic.uuid,
          bufferToString((await characteristic.readValue()).buffer)
        );
      }
    } catch {
      console.log("(empty)");
    } finally {
      console.groupEnd();
    }
  }
};

const getBluetoothDevices = async () => {
  console.log({ bluetooth: navigator.bluetooth });
  const device = await navigator.bluetooth.requestDevice({
    filters: [{ namePrefix: "NEEWER" }],
    optionalServices: Object.values(Services),
  });

  const server = await device.gatt.connect();

  await logAllCharacteristics(server);

  const service = await server.getPrimaryService(Services.CONTROL);
  const characteristic = await service.getCharacteristic(
    Characteristics.CONTROL
  );
  await characteristic.writeValue(Commands.POWER_OFF);
  console.log(bufferToString((await characteristic.readValue()).buffer));
  await new Promise((res) => setTimeout(res, 1000));
  await characteristic.writeValue(Commands.POWER_ON);
  console.log(bufferToString((await characteristic.readValue()).buffer));
};

document
  .querySelector("#add-device")
  .addEventListener("click", getBluetoothDevices);
