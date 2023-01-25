import { nanoid } from "https://deno.land/x/nanoid@v3.0.0/mod.ts";
import { Signal, signal } from "@preact/signals";

type Point = { x: number; y: number };

const coords: Record<string, Signal<Point>> = {};
export const dragTarget = signal<string | null>(null);

const id = nanoid();

export default () => (
  <div onPointerDown={console.log} onPointerUp={console.log}>{id}</div>
);
