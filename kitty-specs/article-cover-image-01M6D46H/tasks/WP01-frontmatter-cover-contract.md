---
work_package_id: WP01
title: 定义可选封面 Frontmatter 契约
dependencies: []
requirement_refs:
- FR-001
- FR-004
- FR-005
planning_base_branch: feature/article-cover-image
merge_target_branch: feature/article-cover-image
branch_strategy: Planning artifacts for this mission were generated on feature/article-cover-image. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into feature/article-cover-image unless the human explicitly redirects the landing branch.
base_branch: kitty/mission-article-cover-image-01M6D46H
base_commit: 56f56be32205d9068495fb5190325ce9d6ea2ac2
created_at: '2026-11-02T04:59:43.108580+00:00'
subtasks:
- T001
- T002
- T003
phase: Phase 1 - Content contract
history:
- timestamp: '2026-11-02T03:25:00Z'
  agent: system
  action: Prompt generated via /spec-kitty.tasks
authoritative_surface: src/lib/content/
create_intent: []
execution_mode: code_change
owned_files:
- src/lib/content/frontmatter-schema.ts
- src/lib/content/frontmatter-schema.test.ts
- standard/frontmatter.md
tags: []
tracker_refs: []
---

# Work Package Prompt: WP01 – 定义可选封面 Frontmatter 契约

## Goal

扩展文章 Frontmatter schema，支持可选的 `coverImage` 字段；为该字段建立校验测试，并更新 Frontmatter 标准，确保作者知道如何配置。

## Requirements

- FR-001：文章可选配置 `coverImage`。
- FR-004：不配置字段的既有文章继续有效，不需要迁移。
- FR-005：Frontmatter 规范说明该字段。

## Scope

修改：

- `src/lib/content/frontmatter-schema.ts`
- `src/lib/content/frontmatter-schema.test.ts`
- `standard/frontmatter.md`

校验规则遵循计划：接受以 `https://` 开头的 URL 或以 `/` 开头的站点根路径；拒绝空白值、HTTP URL 和其他相对路径。字段必须可选，且其值经过首尾空格清理后不能为空。此字段不探测图片是否可访问。

Frontmatter 文档应将 `coverImage` 列入可选字段顺序和字段约束，给出根路径示例，保留 `heroImage` 与 `cover` 为禁止字段，并删除“文章不设置封面”规则。不得修改任何现有文章文件。

## Out of Scope

- 文章详情页 Hero 渲染（由 WP02 实现）。
- 列表卡片、分享元数据、JSON-LD 或图片裁切行为。
- 本地相对导入、HTTP URL、图像处理或远程图片可用性检查。

## Subtasks

- **T001**：在严格 schema 中定义并保留可选 `coverImage` 字段。
- **T002**：增加字段缺省、HTTPS URL、根路径、空值和不支持引用形式的测试。
- **T003**：更新 Frontmatter 标准的字段顺序、约束、样例和禁止字段说明。

## Verification

运行：

```bash
npx vitest run src/lib/content/frontmatter-schema.test.ts
```

确认现有不带 `coverImage` 的有效文章仍通过测试，且 schema 测试涵盖接受和拒绝场景。

## Completion Criteria

- schema 将合法字段类型传递给 Astro CollectionEntry。
- 既有文章无需修改即可通过 schema。
- 文档示例和禁止字段章节与新字段规则一致。
- 目标 Vitest 文件通过。

## Activity Log

- 2026-11-02: Created task package from the approved mission plan.
