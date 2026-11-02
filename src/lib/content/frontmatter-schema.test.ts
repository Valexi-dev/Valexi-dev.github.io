import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { blogFrontmatterSchema } from './frontmatter-schema';

const validPost = {
	title: '正式文章',
	date: '2026-07-29T10:00:00+08:00',
	categories: ['工程'],
	tags: ['astro'],
};

describe('blogFrontmatterSchema', () => {
	it('defaults a valid post to draft false and exposes normalized dates', () => {
		const result = blogFrontmatterSchema.parse(validPost);

		expect(result.draft).toBe(false);
		expect(result.coverImage).toBeUndefined();
		expect(result.pubDate).toBeInstanceOf(Date);
		expect(result.updatedDate).toBeUndefined();
	});

	it.each([
		'https://images.example.com/article-cover.webp',
		'HTTPS://images.example.com/article-cover.webp',
		'/image/article-cover.webp',
	])(
		'accepts a supported cover image reference: %s',
		(coverImage) => {
			const result = blogFrontmatterSchema.parse({ ...validPost, coverImage });

			expect(result.coverImage).toBe(coverImage);
		},
	);

	it('trims whitespace around a cover image reference', () => {
		const result = blogFrontmatterSchema.parse({
			...validPost,
			coverImage: '  /image/article-cover.webp  ',
		});

		expect(result.coverImage).toBe('/image/article-cover.webp');
	});

	it('documents the optional cover image contract', () => {
		const standard = readFileSync(new URL('../../../standard/frontmatter.md', import.meta.url), 'utf8');

		expect(standard).toContain('| `coverImage` | 字符串 | 否 |');
		expect(standard).toContain('coverImage: "/image/article-cover.webp"');
		expect(standard).toContain('postDefaultBackground');
		expect(standard).toContain('- `heroImage`');
		expect(standard).toContain('- `cover`');
	});

	it.each([
		'',
		'   ',
		'http://images.example.com/article-cover.webp',
		'image/article-cover.webp',
		'//images.example.com/article-cover.webp',
		'https://',
		'/\\images.example.com/article-cover.webp',
	])('rejects an unsupported cover image reference: %s', (coverImage) => {
		const result = blogFrontmatterSchema.safeParse({ ...validPost, coverImage });

		expect(result.success).toBe(false);
	});

	it('allows a draft to have no category or tags', () => {
		const result = blogFrontmatterSchema.parse({
			title: '空草稿',
			date: '2026-07-29T10:00:00+08:00',
			draft: true,
			categories: [],
			tags: [],
		});

		expect(result.categories).toEqual([]);
		expect(result.tags).toEqual([]);
	});

	it.each([
		[{ ...validPost, categories: [] }, '正式文章必须且只能有一个分类'],
		[{ ...validPost, categories: ['工程', '随笔'] }, '文章最多只能有一个分类'],
		[{ ...validPost, tags: [] }, '正式文章至少需要一个标签'],
		[{ ...validPost, tags: ['astro', 'astro'] }, '标签不能重复'],
	])('rejects invalid publishable metadata', (frontmatter, message) => {
		const result = blogFrontmatterSchema.safeParse(frontmatter);

		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.issues.some((issue) => issue.message === message)).toBe(true);
		}
	});

	it('trims text fields and rejects empty taxonomy values', () => {
		const parsed = blogFrontmatterSchema.parse({
			...validPost,
			title: '  标题  ',
			categories: ['  工程  '],
			tags: ['  astro  '],
		});
		expect(parsed.title).toBe('标题');
		expect(parsed.categories).toEqual(['工程']);
		expect(parsed.tags).toEqual(['astro']);

		expect(blogFrontmatterSchema.safeParse({ ...validPost, tags: ['  '] }).success).toBe(false);
	});

	it('rejects legacy and unknown fields', () => {
		const result = blogFrontmatterSchema.safeParse({
			...validPost,
			pubDate: '2026-07-29',
		});

		expect(result.success).toBe(false);
	});
});
