/*
 * Copyright (c) 2023. Alex Congritta
 *
 * E-Mail: congritta@gmail.com
 * WebSite: https://congritta.com
 */

import {watch} from "chokidar";
import {build, BuildOptions} from "esbuild";
import cssModulesPlugin from "esbuild-css-modules-plugin";
import {copySync, removeSync} from "fs-extra";
import {LiveServerParams, start} from "live-server";
import config from "./src/config";

const isWatch = process.argv.includes("--watch");

/**
 * Live Server Params
 * @link https://www.npmjs.com/package/live-server#usage-from-node
 */
const serverParams: LiveServerParams = {
  port: config.HTTP_DEV_SERVER.PORT, // Set the server port. Defaults to 8080.
  root: "build", // Set root directory that's being served. Defaults to cwd.
  open: false, // When false, it won't load your browser by default.
  host: config.HTTP_DEV_SERVER.HOST, // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
};

/**
 * ESBuild Params
 * @link https://esbuild.github.io/api/#build-api
 */
const buildParams: BuildOptions = {
  color: true,
  entryPoints: ["src/index.tsx"],
  loader: {".ts": "tsx", ".json": "json", ".png": "file", ".jpeg": "file", ".jpg": "file", ".svg": "file"},
  assetNames: "assets/[name]-[hash]",
  outdir: "build",
  minify: !isWatch,
  format: "cjs",
  bundle: true,
  sourcemap: isWatch,
  logLevel: "error",
  incremental: isWatch,
  plugins: [
    cssModulesPlugin(),
  ]
};

// Clean build folder
try {
  removeSync("build");
}
catch(err) {
  console.error(err);
}
// Copy public folder into build folder
try {
  copySync("public", "build");
}
catch(err) {
  console.error(err);
}

if(isWatch) {
  (async() => {
    // Build
    const result = await build(buildParams).catch(() => process.exit(1));

    // Start live server
    start(serverParams);
    /**
     * Watch development server changes
     * ignored: ignore watch `.*` files
     */
    return watch("src/**/*", {ignored: /(^|[/\\])\../, ignoreInitial: true}).on("all", async(event, path) => {
      if(event === "change") {
        console.log(`⚡ [esbuild] Rebuilding ${path}`);
        console.time("⚡ [esbuild] Done");
        if(result.rebuild) {
          await result.rebuild();
        }
        console.timeEnd("⚡ [esbuild] Done");
      }
    });
  })();
}
else {
  // Run build
  console.log(`⚡ [esbuild] Building..`);
  build(buildParams).catch(() => process.exit(1));
}
