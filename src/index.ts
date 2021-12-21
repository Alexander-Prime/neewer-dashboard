import { h, render } from "preact";

import { App } from "./App.tsx";

render(h(App, {}), document.body, document.querySelector("#root") ?? undefined);
