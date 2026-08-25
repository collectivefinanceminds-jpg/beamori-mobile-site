import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Pin the workspace root to this project. Without it, Turbopack walks up
    // and finds an unrelated package.json in the user's home directory, and
    // warns on every build.
    root: path.resolve(__dirname),
  },
  images: {
    // Next's built-in image optimizer caches its output by request URL only
    // — it never checks whether the source file on disk actually changed,
    // so re-dropping a file at the same public/ path (this project's whole
    // image drop-in convention) kept serving the old cached rendition.
    // Disabling optimization makes next/image behave like a plain <img>:
    // the browser fetches the real file and caches/revalidates it normally,
    // which always reflects the current file. Revisit once real, final
    // assets are locked in and no longer being swapped by hand.
    unoptimized: true,
  },
};

export default nextConfig;
