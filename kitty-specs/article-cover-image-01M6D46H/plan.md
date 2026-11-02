# Implementation Plan: 文章可选封面图

**Branch**: `feature/article-cover-image` | **Date**: 2026-11-02 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `kitty-specs/article-cover-image-01M6D46H/spec.md`

## Summary

为严格的文章 Frontmatter 契约增加可选 `coverImage` 字符串字段，在 `BlogPost` 详情页布局中优先使用它作为 Hero 背景；字段缺省时继续使用 `heroConfig.postDefaultBackground`。保持现有社交分享元数据和结构化数据的默认图片行为不变。同步更新 Frontmatter 标准并通过 schema 测试与 Astro 构建验证。

## Technical Context

**Language/Version**: TypeScript, Node.js >=22.12  
**Primary Dependencies**: Astro 6, Zod（由 `astro/zod` 提供）、Vitest  
**Storage**: Markdown/MDX Frontmatter；无数据库或迁移  
**Testing**: Vitest 单元测试、`astro check`、静态站点构建  
**Target Platform**: Astro 静态站点，部署至 Cloudflare Pages  
**Project Type**: 单体 Web 前端/静态站点  
**Performance Goals**: 不增加运行时请求或客户端逻辑；沿用现有 Hero 背景图加载方式  
**Constraints**: 文章 schema 使用 `.strict()`；未提供封面必须兼容；封面只改变详情页顶部视觉图，不扩展到列表及分享元数据  
**Scale/Scope**: 一个可选 Frontmatter 字段、文章详情页 Hero 选择、Frontmatter 文档和覆盖性测试

## Charter Check

项目没有 `.kittify/charter/charter.md` 或同步的 charter 配置；`spec-kitty charter status` 报告 charter 不存在。因此没有项目级 charter 约束可应用，本计划遵守 mission spec 与当前仓库的内容契约和测试约定，不为本功能创建 charter。

## Research Findings and Decisions

1. `src/lib/content/frontmatter-schema.ts` 定义严格的文章 schema；未经声明的 Frontmatter 键会被拒绝。文章数据经 `src/content.config.ts` 校验后由 `src/pages/blog/[...slug].astro` 传给 `BlogPost`。
2. `src/layouts/BlogPost.astro` 当前将 `heroConfig.postDefaultBackground` 同时用作 Hero 图、预加载图及文章 JSON-LD/`PageShell` 分享图。`HeroHeader.astro` 已接受字符串背景图并以 CSS `background-image` 渲染，因此无需新增组件或图片处理依赖。
3. 仓库正文图片使用 `/image/...` 根路径；默认 Hero 使用 HTTPS URL。`coverImage` 支持 HTTPS URL 或站点根路径（例如 `/image/article-cover.webp`），不支持相对于文章路由解析的裸相对路径或本地导入的 Astro `ImageMetadata`。
4. `coverImage` 缺省时用默认 Hero 图；提供空白值或不符合上述引用形式的值时由 schema 校验拒绝。静态构建不探测外部 URL 是否可访问，也不承诺对语法有效但失效的图片地址提供运行时回退。
5. 分享元数据不在功能范围内：`PageShell` 的 Open Graph/Twitter 图片和文章 JSON-LD `image` 继续使用当前默认图片；详情页 Hero 与其 preload 使用选定的文章封面。

## Design and Data Flow

```text
Markdown/MDX Frontmatter
        │
        ▼
blogFrontmatterSchema validates optional coverImage
        │
        ▼
BlogPost: coverImage ?? heroConfig.postDefaultBackground
        │
        ├── HeroHeader background
        └── Hero image preload

PageShell social metadata + BlogPosting JSON-LD ── existing default image (unchanged)
```

### Content Contract

- 在 `blogFrontmatterSchema` 声明可选、去除首尾空格且不可为空的字符串 `coverImage`。
- 接受以 `https://` 开头的绝对 URL，以及以 `/` 开头的站点根路径；拒绝空白值、HTTP URL 和其他相对 URL。校验不执行网络访问。
- 在 schema 的派生数据中保留 `coverImage`，使 CollectionEntry 类型将其传至文章布局。
- Frontmatter 标准将 `coverImage` 列为可选字段，示例使用站点根路径；保留 `heroImage`、`cover` 等旧名为禁止字段，并删除“文章不设置封面”的旧规则。
- 不修改任何现有文章文件，也不要求内容迁移。

### Rendering Contract

- `BlogPost.astro` 读取 `coverImage`，计算展示图 `coverImage ?? heroConfig.postDefaultBackground`。
- 将展示图用于文章页 `HeroHeader` 和 head 中的 image preload。
- 保持 `PageShell image`、JSON-LD `image` 与现有默认图绑定，避免把详情页视觉封面扩展为分享图或 SEO 行为变更。
- 不修改 `HeroHeader` 布局、遮罩、裁切样式或其他页面调用方。

## Project Structure

### Mission Documentation

```text
kitty-specs/article-cover-image-01M6D46H/
├── spec.md
└── plan.md
```

### Source Changes

```text
src/
├── lib/content/
│   ├── frontmatter-schema.ts          # 可选封面字段与引用格式校验
│   └── frontmatter-schema.test.ts     # 缺省、有效值和无效值测试
└── layouts/
    └── BlogPost.astro                 # 选择详情页 Hero 背景及 preload 图片

standard/
└── frontmatter.md                     # 字段顺序、约束、样例和禁止字段说明
```

**Structure Decision**: 沿用 Astro 内容集合和布局现有边界；不新增组件、插件、配置层或运行时图片服务。

## Verification Plan

1. 扩展 `src/lib/content/frontmatter-schema.test.ts`：无 `coverImage` 的既有有效 frontmatter 仍能解析；合法 HTTPS URL 和根路径被接受并保留；空白值、HTTP URL、裸相对路径被拒绝。
2. 运行 `npx vitest run src/lib/content/frontmatter-schema.test.ts` 验证内容契约。
3. 运行 `npm run check` 验证 Astro 页面、内容集合和类型；运行 `npm run build` 验证未修改的现有文章可静态生成。
4. 检查构建的文章 HTML：配置封面的测试文章 Hero 背景和 preload 指向封面；未配置封面的文章仍指向 `postDefaultBackground`；分享元数据保持默认图片。

## Rollout, Migration, and Risks

- **Rollout**: 直接随站点发布。字段是可选的，旧内容继续使用默认图，不需要分阶段发布或数据迁移。
- **Risk — 引用误填**: 静态 schema 只能校验引用形式，不能确认部署环境中资源存在；文档应示范正确的根路径格式。
- **Risk — 外部资源不可用**: HTTPS 资源可能在部署后失效；当前 Hero 使用 CSS 背景图，没有图像加载失败回调。该功能不增加运行时检测或替代图逻辑。
- **Scope guard**: 不更改首页/列表卡片、社交分享图、SEO JSON-LD 图或图片裁切行为。

## Implementation Concern Map

### IC-01 — Frontmatter 契约与规范

- **Purpose**: 将文章级封面定义为有类型、可选且校验一致的内容字段，并记录作者可用的输入形式。
- **Relevant requirements**: FR-001, FR-004, FR-005
- **Affected surfaces**: `src/lib/content/frontmatter-schema.ts`, `src/lib/content/frontmatter-schema.test.ts`, `standard/frontmatter.md`
- **Sequencing/depends-on**: none
- **Risks**: Schema 是严格的；未将字段纳入契约会导致所有带封面的文章构建失败。

### IC-02 — 详情页封面选择

- **Purpose**: 在文章详情 Hero 中选择文章封面或现有默认图，保持其他图像用途不变。
- **Relevant requirements**: FR-002, FR-003, FR-004
- **Affected surfaces**: `src/layouts/BlogPost.astro`, `src/components/HeroHeader.astro`（复用，不预期修改）
- **Sequencing/depends-on**: IC-01
- **Risks**: 分享元数据和 JSON-LD 复用默认图；需避免把新的 Hero 图片变量误用于这些未纳入需求的输出。

### IC-03 — 行为验证

- **Purpose**: 验证字段解析、默认回退、构建兼容及详情页输出。
- **Relevant requirements**: FR-001, FR-002, FR-003, FR-004, FR-005
- **Affected surfaces**: Frontmatter schema 测试、Astro check、生产构建 HTML
- **Sequencing/depends-on**: IC-01, IC-02
- **Risks**: 仅验证 schema 不能证明静态 HTML 的 Hero 和 preload 使用了正确来源。
