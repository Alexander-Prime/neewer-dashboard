export const Services = {
  UNKNOWN_A: 0x1800,
  UNKNOWN_B: 0x1801,
  CONTROL: "69400001-b5a3-f393-e0a9-e50e24dcca99",
  UNKNOWN_D: "7f510004-b5a3-f393-e0a9-e50e24dcca9e",
};

export const Characteristics = {
  CONTROL: "69400002-b5a3-f393-e0a9-e50e24dcca99",
};

export const Commands = {
  POWER_ON: Uint8Array.of(0x78, 0x81, 0x01, 0x01, 0xfb),
  POWER_OFF: Uint8Array.of(0x78, 0x81, 0x01, 0x02, 0xfc),
};
