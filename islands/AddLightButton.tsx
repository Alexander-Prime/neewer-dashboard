import { nanoid } from "https://deno.land/x/nanoid@v3.0.0/mod.ts";

import classNames from "classnames";
import { useCallback, useState } from "preact/hooks";

import Button from "~/components/Button.tsx";
import Modal from "~/components/Modal.tsx";
import { getBluetoothDevices } from "~/utils/bluetooth.ts";
import { lights } from "~/signals/lights.ts";

type Props = {
  className?: string;
};

export default ({ className }: Props) => {
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

  const onCreateTestLight = useCallback(() => {
    lights.value = [...lights.value, {
      ref: nanoid(),
      position: { x: 0.5, y: 0.5 },
    }];
    setModalVisible(false);
  }, [lights.value, setModalVisible]);

  return (
    <>
      <Button
        className={classNames("AddLightButton", className)}
        iconName="add"
        onClick={onClick}
      >
        Add light
      </Button>
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
        <Button
          iconName="add"
          onClick={onCreateTestLight}
        >
          Add Test Light
        </Button>
      </Modal>
    </>
  );
};
