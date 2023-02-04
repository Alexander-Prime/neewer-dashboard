import { effect, signal } from "@preact/signals";

import { store } from "~/store.ts";

export type Point = { x: number; y: number };

export type Light = {
  position: Point;
  ref: string;
};

export const lights = signal<Light[]>(store.get("lights") ?? []);

effect(() => store.set("lights", lights.value));
