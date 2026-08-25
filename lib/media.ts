import fs from "node:fs";
import path from "node:path";

const IMAGE_EXTENSIONS = ["png", "jpg", "jpeg", "webp"] as const;

/**
 * Looks for a real image at `public/<basePath>.{png,jpg,jpeg,webp}` and
 * returns its public URL, or null if nothing has been dropped in yet.
 *
 * Lets homepage sections fall back to a placeholder until a real asset is
 * added at the documented path — no upload UI, no storage backend, just a
 * file-system convention. Server-only (uses `fs`) — call it from a Server
 * Component and pass the resolved string down to any client component.
 *
 * Treats a 0-byte file the same as "not there yet" rather than an existing
 * asset — a drag-and-drop that gets interrupted mid-copy leaves exactly this
 * (a real file entry with no bytes), which would otherwise pass
 * `existsSync` and get handed to next/image, which then fails to decode it.
 */
export function findPublicAsset(basePath: string): string | null {
  for (const ext of IMAGE_EXTENSIONS) {
    const relativePath = `${basePath}.${ext}`;
    const absolutePath = path.join(process.cwd(), "public", relativePath);
    if (fs.existsSync(absolutePath) && fs.statSync(absolutePath).size > 0) {
      return `/${relativePath}`;
    }
  }
  return null;
}
