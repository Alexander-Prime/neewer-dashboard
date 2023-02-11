import { effect, signal } from "@preact/signals";

import { store } from "~/store.ts";

export type Point = { x: number; y: number };

export type Light = {
  position: Point;
};

export const lights = signal<Record<string, Light>>(store.get("lights") ?? {});

effect(() => store.set("lights", lights.value));
