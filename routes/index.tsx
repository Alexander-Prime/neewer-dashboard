import { Head } from "$fresh/runtime.ts";
import Radar from "~/islands/Radar.tsx";
import AddLightButton from "~/islands/AddLightButton.tsx";

export default () => (
  <>
    <Head>
      <link rel="stylesheet" href="/styles/index.css" />
    </Head>
    <Radar />
    <AddLightButton />
  </>
);
