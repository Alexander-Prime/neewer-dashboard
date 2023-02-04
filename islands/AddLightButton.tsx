import { useCallback, useState } from "preact/hooks";

import Button from "~/components/Button.tsx";
import Modal from "~/components/Modal.tsx";
import { getBluetoothDevices } from "~/utils/bluetooth.ts";

export default () => {
  const [modalVisible, setModalVisible] = useState(false);

  const onClick = useCallback(async () => {
    try {
      const device = await getBluetoothDevices();
    } catch {
      setModalVisible(true);
    }
  }, [setModalVisible]);

  const onDismiss = useCallback(() => setModalVisible(false), [
    setModalVisible,
  ]);

  return (
    <>
      <Button iconName="add" onClick={onClick}>Add light</Button>
      <Modal
        className="AddLightButton-errorModal"
        visible={modalVisible}
        onDismiss={onDismiss}
      >
        <p>
          Couldn't find bluetooth devices. Please make sure your browser
          supports Web Bluetooth.
        </p>
        <p>You can add a test light that doesn't control a physical device.</p>
        <Button iconName="add">Add Test Light</Button>
      </Modal>
    </>
  );
};
