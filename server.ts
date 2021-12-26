import { dirname, resolve } from "std/path/mod.ts";
import { Server, Handler } from "std/http/server.ts";

const staticFileResponse = async (path: string) => {
  return new Response(await Deno.readFile(path), {
    headers: { "Content-Type": mimetypeFromPath(path) },
  });
};

const mimetypeFromPath = (path: string) => {
  const [_, ext] = path.match(/\.([^.]+)$/) || [];
  return EXT_MIMETYPES[ext as keyof typeof EXT_MIMETYPES] ?? "text/plain";
};

const EXT_MIMETYPES = {
  html: "text/html",
  js: "text/javascript",
};

const bundle = async (path: string) => {
  const importMap = JSON.parse(await Deno.readTextFile("./import_map.json"));

  const { files } = await Deno.emit(path, {
    importMap,
    importMapPath: "./",
    bundle: "module",
  });

  for (const [urlString, data] of Object.entries(files)) {
    const url = new URL(urlString);
    const outPath = resolve("./build", `./${url.pathname}`);
    console.log(`Writing ${outPath}`);
    await Deno.mkdir(dirname(outPath), { recursive: true });
    await Deno.writeTextFile(outPath, data);
  }
};

const watchBundle = async (path: string) => {
  bundle(path);
  for await (const _ of Deno.watchFs(dirname(path))) {
    try {
      bundle(path);
    } catch (e) {
      console.error(e);
    }
  }
};

const handler: Handler = async (request) => {
  const url = new URL(request.url);
  console.log(`${request.method} ${url.pathname}`);

  try {
    const response = await staticFileResponse(`./${url.pathname}`);
    return response;
  } catch {
    const response = await staticFileResponse("./static/index.html");
    return response;
  }
};

try {
  const addr = "0.0.0.0:8000";
  const server = new Server({ handler, addr });

  console.log(`Starting server on ${addr}`);
  await Promise.race([
    server.listenAndServeTls("./ada.crt", "./ada.key"),
    watchBundle("./src/index.ts"),
  ]);
} catch (e) {
  console.error(e);
}
