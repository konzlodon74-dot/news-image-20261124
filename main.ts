// news-image-20261124 entry program (Node 22, standard library only).
//
// The entry image ships in this repository as entry.png, next to this file.
// The program copies it to the output directory as entry.png, byte for byte,
// so both grader runs produce identical output. Outside the grader,
// MAKEFUN_OUTPUT_DIR stands in for /output:
//
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });

const src = new URL('./entry.png', import.meta.url);
const dst = join(outDir, 'entry.png');
copyFileSync(src, dst);

// The gate reads exactly the bytes written, so confirm the copy is whole:
// the destination must hold as many bytes as the image beside this file.
const expected = statSync(src).size;
const written = statSync(dst).size;
if (written !== expected) {
  throw new Error(`entry.png copy incomplete: wrote ${written} of ${expected} bytes`);
}
