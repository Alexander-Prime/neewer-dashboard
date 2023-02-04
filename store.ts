import { IS_BROWSER } from "$fresh/runtime.ts";

export const store = {
  get: (key: string) => {
    if (IS_BROWSER) {
      return JSON.parse(window.localStorage.getItem(key) ?? "null");
    }
  },
  set: (key: string, value: unknown) => {
    if (IS_BROWSER) {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  },
};
