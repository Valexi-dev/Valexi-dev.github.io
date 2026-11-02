---
work_package_id: WP02
title: 在文章详情页展示封面图
dependencies:
- WP01
requirement_refs:
- FR-002
- FR-003
- FR-004
planning_base_branch: feature/article-cover-image
merge_target_branch: feature/article-cover-image
branch_strategy: Planning artifacts for this mission were generated on feature/article-cover-image. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into feature/article-cover-image unless the human explicitly redirects the landing branch.
base_branch: kitty/mission-article-cover-image-01M6D46H
base_commit: 56f56be32205d9068495fb5190325ce9d6ea2ac2
created_at: '2026-11-02T05:14:22.819222+00:00'
subtasks:
- T004
- T005
phase: Phase 2 - Article page rendering
history:
- timestamp: '2026-11-02T03:25:00Z'
  agent: system
  action: Prompt generated via /spec-kitty.tasks
authoritative_surface: src/layouts/BlogPost.astro
create_intent: []
execution_mode: code_change
owned_files:
- src/layouts/BlogPost.astro
tags: []
tracker_refs: []
---

# Work Package Prompt: WP02 – 在文章详情页展示封面图

## Goal

将可选的 `coverImage` 接入文章详情页 Hero。已配置时显示文章封面；未配置时继续使用现有默认文章背景图。

## Requirements

- FR-002：详情页顶部展示该文章配置的封面。
- FR-003：未配置封面时使用现有默认图。
- FR-004：旧文章无需迁移，页面继续正常构建。

## Dependencies

- **Depends on: WP01** — 内容 schema 必须先声明 `coverImage`，以便 CollectionEntry 提供经过校验的字段类型。

## Scope

修改：

- `src/layouts/BlogPost.astro`

将详情页 Hero 使用的背景图选择为 `coverImage ?? heroConfig.postDefaultBackground`，并使 Hero 的 preload 使用同一张图。保留 `PageShell` 的图片属性和 BlogPosting JSON-LD `image` 使用当前默认图片，避免扩大到社交分享或 SEO 行为。不得更改 `HeroHeader` 的布局、裁切和其他调用方。

## Out of Scope

- 修改文章列表、归档卡片、首页或标签页的图片。
- 修改 Open Graph/Twitter 图片或 BlogPosting JSON-LD 图片。
- 新增图片加载失败检测、运行时回退或图像处理行为。
- 修改现有文章 Frontmatter。

## Subtasks

- **T004**：在文章布局中选择文章封面或默认背景图，并将选中图用于 Hero 和图片 preload。
- **T005**：运行 Astro 类型检查和生产构建，检查生成 HTML 中配置封面与缺省封面文章的 Hero/preload，并确认分享元数据维持默认图。

## Verification

运行：

```bash
npm run check
npm run build
```

检查静态输出中配置封面文章的 Hero 背景与 preload 均引用 `coverImage`；未配置封面的现有文章两者均引用 `heroConfig.postDefaultBackground`。同时确认 Open Graph/Twitter 与 BlogPosting JSON-LD 的图片不变。

## Completion Criteria

- 配置封面的文章详情页顶部显示该封面。
- 未配置封面的文章继续显示默认图。
- Hero 背景与 preload 的图片来源保持一致。
- 分享元数据与 JSON-LD 不因本改动改变。
- 类型检查、构建和输出检查通过。

## Activity Log

- 2026-11-02: Created task package from the approved mission plan.
