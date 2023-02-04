import Button from "~/components/Button.tsx";
import { getBluetoothDevices } from "~/utils/bluetooth.ts";

export default () => (
  <Button iconName="add" onClick={getBluetoothDevices}>Add light</Button>
);
