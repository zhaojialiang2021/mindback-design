# 部署指南

MindBack 设计系统 docs 站的部署。

## 一句话

整个仓库是标准 Vite SPA + 静态 AI 端点。`npm run build` 出来的 `dist/` 直接丢任何静态托管都行。

## 推荐：Vercel 一键

### 1. 推到 GitHub

```bash
git init
git add -A
git commit -m "v1.0.0-alpha 初始版本"
git remote add origin git@github.com:<you>/mindback.git
git push -u origin main
```

### 2. Vercel 导入

打开 [vercel.com/new](https://vercel.com/new)，选这个仓库。配置：

| 字段 | 值 |
|------|------|
| Framework Preset | Vite |
| Build Command | `npm run tokens && npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

注意 **Build Command 加了 `npm run tokens &&` 前缀**——确保 build 前 public/ 里的产物是最新的。

### 3. 域名

在 Vercel Dashboard → Settings → Domains 添加 `docs.mindback.com`。

DNS 记录（CNAME）：

```
docs.mindback.com  CNAME  cname.vercel-dns.com
```

### 4. 验证 AI 端点

部署完成后，跑：

```bash
curl https://docs.mindback.com/llms.txt
curl https://docs.mindback.com/tokens.json | head
curl https://docs.mindback.com/skill.md | head
```

预期：6 个端点（llms.txt / skill.md / design.md / tokens.json / components.md / components.json）全部 200 OK。

## 备选：Cloudflare Pages / Netlify

配置基本一致：

- Build command: `npm run tokens && npm run build`
- Output: `dist`

注意：当前 vite middleware（dev 模式 `/skill.md` 端点）在生产不生效——但 `public/` 里同名静态文件会接管，**两边返回内容一致**，无感知。

## 备选：自托管

```bash
npm run build
# 把 dist/ 整个上传到任何静态服务器
# nginx / caddy / s3 + cloudfront 都可以
```

最小 nginx 配置：

```nginx
server {
  listen 80;
  server_name docs.mindback.com;
  root /var/www/mindback/dist;
  index index.html;

  # SPA fallback：所有路径 fallback 到 index.html
  location / {
    try_files $uri $uri/ /index.html;
  }

  # AI 端点显式 content-type
  location ~ \.md$ {
    add_header Content-Type "text/markdown; charset=utf-8";
  }
  location = /llms.txt {
    add_header Content-Type "text/plain; charset=utf-8";
  }

  # 缓存策略
  location ~* \.(js|css|png|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }
  # AI 端点不缓存（更新即时生效）
  location ~ \.(md|json|txt)$ {
    add_header Cache-Control "no-cache";
  }
}
```

## CI（可选）

`.github/workflows/lint.yml`：

```yaml
name: Lint
on: [push, pull_request]
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run tokens
      - run: npm run lint:tokens
      - run: npm run build
```

`token-lint` 必须 0 违规才能 merge。这是 brief §4.3 的 contract enforcement。

## 部署后的检查清单

- [ ] `https://docs.mindback.com/` 加载，看到首页 hero「一套文档驱动的设计系统」
- [ ] 顶部三组导航 System / MindBack / Writing 都能切换
- [ ] `/docs/components/button` Live Demo 可调，Copy for AI 按钮工作
- [ ] `/skill.md` `/design.md` `/tokens.json` 全 200
- [ ] dark 模式跟随系统切换
- [ ] 移动端 < 960px 侧栏自动 stack（未来 v1.1 实现，当前不强制）

## 故障排查

**问题**: 部署后 AI 端点 404

**原因**: `npm run tokens` 没在 build 前跑过。public/ 里没有产物。

**修复**: Vercel Build Command 改成 `npm run tokens && npm run build`，重新部署。

---

**问题**: hash 路由刷新 404

**原因**: 静态托管不识别 `#` 后的 hash。其实它**只是看起来 404，实际刷新会去拿 `/`**——SPA fallback 没配的话所有非 hash 路径就 404 了。

**修复**: Vercel / Netlify 默认有 SPA fallback。自托管 nginx 加 `try_files $uri $uri/ /index.html;`（上面 nginx 配置里已有）。

---

**问题**: token 改了部署后没生效

**原因**: tokens.json 被 CDN 缓存。

**修复**: 上面 nginx 配置已加 `Cache-Control: no-cache`，Vercel 自动识别 SPA 不缓存 markdown / JSON。如果你自定义了 CDN 规则，确认 .md / .json / .txt 走 no-cache。
