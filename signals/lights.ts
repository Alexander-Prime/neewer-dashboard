import { signal } from "@preact/signals";
import { nanoid } from "https://deno.land/x/nanoid@v3.0.0/mod.ts";

export type Point = { x: number; y: number };

export type Light = {
  position: Point;
  ref: string;
};

export const lights = signal<Record<string, Light>>({
  [nanoid()]: {
    position: { x: 100, y: 300 },
    ref: nanoid(),
  },
  [nanoid()]: {
    position: { x: 400, y: 200 },
    ref: nanoid(),
  },
});
