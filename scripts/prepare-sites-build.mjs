import { access, copyFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const clientIndex = resolve(root, "dist/client/index.html");
const serverDirectory = resolve(root, "dist/server");
const workerSource = resolve(root, "worker/static-worker.mjs");
const workerTarget = resolve(serverDirectory, "index.js");

await access(clientIndex);
await access(workerSource);
await mkdir(serverDirectory, { recursive: true });
await copyFile(workerSource, workerTarget);

console.log("Prepared Sites-compatible Vue build output.");
