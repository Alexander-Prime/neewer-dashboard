import { Head } from "$fresh/runtime.ts";
import Radar from "../islands/Radar.tsx";

export default () => (
  <>
    <Head>
      <link rel="stylesheet" href="/styles/index.css" />
    </Head>
    <Radar />
  </>
);
