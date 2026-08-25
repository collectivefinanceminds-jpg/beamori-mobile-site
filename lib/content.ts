import fs from "node:fs";
import path from "node:path";

export type TextContent = {
  title: string;
  description: string;
};

/**
 * Reads `public/<basePath>.txt` — line 1 is the title, everything after is
 * the description — and returns it, or null if the file doesn't exist or is
 * empty. Lets content be edited as a plain text file instead of code, with
 * no risk of a typo breaking the build the way editing a .ts data file
 * would. Server-only (uses `fs`) — call from a Server Component.
 */
export function findPublicText(basePath: string): TextContent | null {
  const absolutePath = path.join(process.cwd(), "public", `${basePath}.txt`);
  if (!fs.existsSync(absolutePath)) return null;

  const raw = fs.readFileSync(absolutePath, "utf-8").trim();
  if (!raw) return null;

  const [title = "", ...rest] = raw.split("\n");
  return { title: title.trim(), description: rest.join(" ").trim() };
}
