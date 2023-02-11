import { effect, signal } from "@preact/signals";

export const hash = signal(globalThis.location?.hash.slice(1));

addEventListener(
  "hashchange",
  () => hash.value = globalThis.location?.hash.slice(1),
);

effect(() => {
  if (globalThis.location) {
    globalThis.location.hash = `#${hash.value}`;
  }
});
