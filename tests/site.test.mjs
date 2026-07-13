import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("build contains the Vue corporate homepage and Sites worker", async () => {
  const html = await readFile(new URL("../dist/client/index.html", import.meta.url), "utf8");
  await access(new URL("../dist/server/index.js", import.meta.url));
  await access(new URL("../dist/.openai/hosting.json", import.meta.url));
  await access(new URL("../dist/client/og.png", import.meta.url));

  assert.match(html, /Mucyan 沐沧科技/);
  assert.match(html, /<div id="app"><\/div>/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/);

  const source = await readFile(new URL("../src/App.vue", import.meta.url), "utf8");
  const content = await readFile(new URL("../src/content.ts", import.meta.url), "utf8");
  assert.match(source, /鲁ICP备2026035323号-1/);
  assert.doesNotMatch(source, /法定代表人|甄彬/);
  assert.match(content, /Mucyan is the English brand name of 沐沧科技（淄博）有限公司/);
  assert.doesNotMatch(content, /法定代表人|甄彬/);
});

test("worker serves HTML and resolves social metadata against the request host", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const builtHtml = await readFile(new URL("../dist/client/index.html", import.meta.url), "utf8");

  const response = await worker.fetch(new Request("https://preview.mucyan.example/"), {
    ASSETS: {
      fetch: async () => new Response(builtHtml, { headers: { "content-type": "text/html" } }),
    },
  });
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html/);
  assert.match(html, /https:\/\/preview\.mucyan\.example\/og\.png/);
  assert.match(html, /rel="canonical" href="https:\/\/preview\.mucyan\.example\/"/);
  assert.doesNotMatch(html, /__SITE_ORIGIN__|__SITE_CANONICAL__/);
});

test("worker serves English metadata and canonical URL for /en/", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("english-test", `${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const builtHtml = await readFile(new URL("../dist/client/index.html", import.meta.url), "utf8");

  const response = await worker.fetch(new Request("https://mucyan.example/en/"), {
    ASSETS: {
      fetch: async () => new Response(builtHtml, { headers: { "content-type": "text/html" } }),
    },
  });
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /<html lang="en">/);
  assert.match(html, /<title>Mucyan \| Technology Made Clear<\/title>/);
  assert.match(html, /rel="canonical" href="https:\/\/mucyan\.example\/en\/"/);
  assert.match(html, /content="en_US"/);
  assert.match(html, /property="og:description" content="Exploring software, intelligent applications, data services, and connected systems with clarity, reliability, and a long-term perspective\."/);
  assert.match(html, /name="twitter:description" content="Exploring software, intelligent applications, data services, and connected systems with clarity, reliability, and a long-term perspective\."/);
  assert.doesNotMatch(html, /面向软件、智能应用、数据与系统方向/);
  assert.doesNotMatch(html, /__SITE_ORIGIN__|__SITE_CANONICAL__/);
});

test("worker normalizes /en and rejects unknown page routes", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("routing-test", `${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const env = {
    ASSETS: {
      fetch: async () => new Response("asset", { status: 200 }),
    },
  };

  const redirect = await worker.fetch(new Request("https://mucyan.example/en?source=test"), env);
  assert.equal(redirect.status, 308);
  assert.equal(redirect.headers.get("location"), "https://mucyan.example/en/?source=test");

  const missing = await worker.fetch(new Request("https://mucyan.example/not-a-page"), env);
  assert.equal(missing.status, 404);
});
