import { signal } from "@preact/signals";

export type Point = { x: number; y: number };

export type Light = {
  position: Point;
  ref: string;
};

export const lights = signal<Light[]>([]);
