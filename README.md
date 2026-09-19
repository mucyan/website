# Mucyan 沐沧科技官网

沐沧科技（淄博）有限公司品牌官网，使用 Vue 3、TypeScript、Vite 与 pnpm 构建。

## 本地开发

```bash
pnpm install
pnpm dev
```

## 构建

```bash
pnpm build
```

构建产物位于 `dist/`，可直接部署到任意静态网站托管服务：

- `dist/index.html`：中文首页
- `dist/en/index.html`：英文首页
- `dist/assets/`：编译后的 JavaScript 与 CSS
- `dist/og.png`：社交分享图片

项目不需要 Node.js 服务端或 Serverless/Worker 运行时。静态托管服务的发布目录设置为 `dist` 即可。

## 发布前需要确认

- 品牌 Logo 与标准色
- 其他业务介绍与案例

## 产品展示

- 首款产品：[MeowPush](https://meowpush.com/)，跨平台 Webhook 推送通知应用。
- 使用场景：Agent 工作流、监控告警、项目集成、家居系统。
- [使用文档](https://docs.meowpush.com/)。各平台下载及支持状态以产品官网为准。
- 中英文首页均设有 `#products` 产品展示区，导航与首屏按钮可直接到达。
- 产品图标保存在 `public/meowpush-icon.png`，来源为 MeowPush 官网。

## 视觉与内容

- 与 MeowPush 协调的暖黄 `#ffc247`、炭黑 `#191918`、柔白 `#fbfaf7` 配色。
- 首屏围绕消息通知、Agent 工作流、系统连接与持续迭代展开。
- 中英文产品介绍、公司介绍与商务联系文案同步维护。

## 官网信息

- 域名：`mucyan.com`
- ICP 备案号：`鲁ICP备2026035323号-1`
- 公安备案号：`鲁公网安备37030302001269号`
- 商务邮箱：`contact@mucyan.com`
- 中文版：`/`
- 英文版：`/en/`
- 法定代表人信息不在官网公开
