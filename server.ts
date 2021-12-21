import {
  dirname,
  fromFileUrl,
  relative,
  resolve,
  toFileUrl,
} from "std/path/mod.ts";

const serve = async (opts: Deno.ListenOptions) => {
  console.log(`\nListening on port ${opts.port}\n`);

  for await (const conn of Deno.listen(opts)) {
    handleConn(conn);
  }
};

const handleConn = async (conn: Deno.Conn) => {
  for await (const req of Deno.serveHttp(conn)) {
    handleRequest(req);
  }
};

const handleRequest = async ({ request, respondWith }: Deno.RequestEvent) => {
  const url = new URL(request.url);
  console.log(`${request.method} ${url.pathname}`);

  try {
    const localPath = `./static/${url.pathname}`;
    try {
      await respondWith(await staticFileResponse(localPath));
    } catch {
      await respondWith(await staticFileResponse("./static/index.html"));
    }
  } catch (e) {
    console.error(e);
  }
};

const staticFileResponse = async (path: string) => {
  return new Response(
    await Deno.readFile(path),
    { headers: { "Content-Type": mimetypeFromPath(path) } },
  );
};

const mimetypeFromPath = (path: string) => {
  const [_, ext] = path.match(/\.([^.]+)$/) || [];
  return EXT_MIMETYPES[ext as keyof typeof EXT_MIMETYPES] ??
    "text/plain";
};

const EXT_MIMETYPES = {
  "html": "text/html",
  "js": "text/javascript",
};

const bundle = async (path: string) => {
  const importMap = JSON.parse(await Deno.readTextFile("./import_map.json"));
  console.log(importMap);
  const { files } = await Deno.emit(path, {
    importMap,
    importMapPath: "./",
    bundle: "module",
  });

  for (const [url, data] of Object.entries(files)) {
    const path = fromFileUrl(url);
    const outPath = resolve("./build", relative("./src", path));
    await Deno.mkdir(dirname(outPath), { recursive: true });
    await Deno.writeTextFile(outPath, data);
  }
};

const watchBundle = async (path: string) => {
  bundle(path);
  for await (const _ of Deno.watchFs(dirname(path))) {
    bundle(path);
  }
};

await Promise.race([
  serve({ port: 8000 }),
  watchBundle("./src/index.ts"),
]);
