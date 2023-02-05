import { Head } from "$fresh/runtime.ts";
import Radar from "~/islands/Radar.tsx";
import AddLightButton from "~/islands/AddLightButton.tsx";

export default () => (
  <>
    <Head>
      <link rel="stylesheet" href="/styles/index.css" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <Radar />
    <AddLightButton />
  </>
);
