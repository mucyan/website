import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

async function assertMissing(path) {
  await assert.rejects(access(path), { code: "ENOENT" });
}

test("build is a standalone static website at the dist root", async () => {
  const html = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");
  const assets = await readdir(new URL("../dist/assets/", import.meta.url));
  await access(new URL("../dist/og.png", import.meta.url));
  await assertMissing(new URL("../dist/client/", import.meta.url));
  await assertMissing(new URL("../dist/server/", import.meta.url));

  assert.match(html, /Mucyan 沐沧科技/);
  assert.match(html, /<div id="app"><\/div>/);
  assert.match(html, /rel="canonical" href="https:\/\/mucyan\.com\/"/);
  assert.match(html, /content="https:\/\/mucyan\.com\/og\.png"/);
  assert.doesNotMatch(html, /__SITE_ORIGIN__|__SITE_CANONICAL__/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/);
  assert.ok(assets.some((file) => file.endsWith(".js")));
  assert.ok(assets.some((file) => file.endsWith(".css")));

  const source = await readFile(new URL("../src/App.vue", import.meta.url), "utf8");
  const content = await readFile(new URL("../src/content.ts", import.meta.url), "utf8");
  assert.match(source, /鲁ICP备2026035323号-1/);
  assert.match(source, /鲁公网安备37030302001269号/);
  assert.match(source, /beian\.mps\.gov\.cn\/#\/query\/webSearch\?code=37030302001269/);
  assert.match(source, /class="language-switch"/);
  assert.match(source, /:href="copy\.languageSwitch\.href"/);
  assert.doesNotMatch(source, /法定代表人|甄彬/);
  assert.match(content, /Mucyan is the English brand name of 沐沧科技（淄博）有限公司/);
  assert.match(content, /languageSwitch: \{ label: "EN", href: "\/en\/"/);
  assert.match(content, /languageSwitch: \{ label: "中文", href: "\/"/);
  assert.doesNotMatch(content, /法定代表人|甄彬/);
});

test("build contains a dedicated English static page", async () => {
  const html = await readFile(new URL("../dist/en/index.html", import.meta.url), "utf8");

  assert.match(html, /<html lang="en">/);
  assert.match(html, /<title>Mucyan \| Technology Made Clear<\/title>/);
  assert.match(html, /rel="canonical" href="https:\/\/mucyan\.com\/en\/"/);
  assert.match(html, /content="https:\/\/mucyan\.com\/og\.png"/);
  assert.match(html, /content="en_US"/);
  assert.doesNotMatch(html, /面向软件、智能应用、数据与系统方向/);
  assert.doesNotMatch(html, /__SITE_ORIGIN__|__SITE_CANONICAL__/);
});
