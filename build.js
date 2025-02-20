import esbuild from "esbuild";
import fs from "fs";

fs.copyFileSync("src/style.css", "dist/style.css");
fs.copyFileSync("src/index.d.ts", "dist/index.d.ts"); // 이 줄이 타입 선언 파일을 복사합니다.

const commonConfig = {
  bundle: true,
  platform: "browser",
  target: "esnext",
  minify: true,
  sourcemap: true,
  metafile: true,
};

await esbuild.build({
  ...commonConfig,
  entryPoints: ["src/cdn.ts"],
  outfile: "dist/index.min.js",
  format: "iife",
  globalName: "EyeOnIt",
  loader: {
    ".css": "text",
  },
  banner: {
    js: "(() => {",
  },
  footer: {
    js: "})();",
  },
});

await esbuild.build({
  ...commonConfig,
  entryPoints: ["src/index.ts"],
  outfile: "dist/index.mjs",
  format: "esm",
  loader: {
    ".css": "copy",
  },
  external: ["*.css"],
});

await esbuild.build({
  ...commonConfig,
  entryPoints: ["src/index.ts"],
  outfile: "dist/index.js",
  format: "cjs",
  loader: {
    ".css": "copy",
  },
  external: ["*.css"],
});
