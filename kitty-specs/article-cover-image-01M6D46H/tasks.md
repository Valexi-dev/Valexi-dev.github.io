# Tasks: 文章可选封面图

## Work Package Map

| WP | Scope | Requirements | Depends on |
|----|-------|--------------|------------|
| WP01 | Frontmatter schema、字段测试和作者规范 | FR-001, FR-004, FR-005 | none |
| WP02 | 文章详情页 Hero 封面选择和构建验证 | FR-002, FR-003, FR-004 | WP01 |

## WP01 — 定义可选封面字段

- **Goal**: 让严格的文章 Frontmatter schema 接受可选 `coverImage`，验证支持的图片引用形式，并记录字段用法。
- **Requirements**: FR-001, FR-004, FR-005
- **Files**: `src/lib/content/frontmatter-schema.ts`, `src/lib/content/frontmatter-schema.test.ts`, `standard/frontmatter.md`
- **Acceptance**:
  - 不含 `coverImage` 的既有有效文章仍能解析。
  - HTTPS URL 和站点根路径（例如 `/image/article-cover.webp`）被接受并保留。
  - 空白值、HTTP URL 和其他相对路径被拒绝。
  - Frontmatter 规范记录可选字段及其示例，且不再声称文章不能设置封面；现有的 `heroImage`、`cover` 禁止规则保留。
- **Verification**: `npx vitest run src/lib/content/frontmatter-schema.test.ts`
- **Depends on**: none

## WP02 — 在详情页展示封面

- **Depends on: WP01**
- **Goal**: 文章详情页优先用 `coverImage` 显示 Hero 背景；字段缺省时使用现有默认背景图。
- **Requirements**: FR-002, FR-003, FR-004
- **Files**: `src/layouts/BlogPost.astro`
- **Acceptance**:
  - 配置封面的文章 Hero 背景和图片 preload 使用文章封面。
  - 未配置封面的文章 Hero 背景和 preload 仍使用 `heroConfig.postDefaultBackground`。
  - `PageShell` 社交分享元数据与 BlogPosting JSON-LD 继续使用现有默认图片。
  - 不修改列表、归档或其他页面，也不要求修改已有文章。
- **Verification**: `npm run check`、`npm run build`；检查生成的文章 HTML，确认 Hero 背景和 preload 符合上述两种路径且分享元数据未改变。
- **Depends on**: WP01
