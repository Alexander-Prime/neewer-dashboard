import { effect, signal } from "@preact/signals";

export const hash = signal(location?.hash.slice(1));

addEventListener(
  "hashchange",
  () => hash.value = location?.hash.slice(1),
);

effect(() => {
  if (location) location.hash = `#${hash.value}`;
});
