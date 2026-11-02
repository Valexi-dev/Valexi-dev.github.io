import { z } from 'astro/zod';

const nonEmptyText = z.string().trim().min(1, '不能是空字符串');

const coverImageReference = z
	.string()
	.trim()
	.min(1, '封面图不能是空字符串')
	.refine((value) => {
		if (value.startsWith('/') && !value.startsWith('//') && !value.includes('\\')) {
			return true;
		}

		try {
			const url = new URL(value);
			return /^https:\/\/[^/?#\\]+/i.test(value) && url.protocol === 'https:' && url.hostname.length > 0;
		} catch {
			return false;
		}
	}, '封面图必须是 HTTPS URL 或站点根路径');

export const blogFrontmatterSchema = z
	.object({
		title: nonEmptyText,
		date: z.coerce.date(),
		updated: z.coerce.date().optional(),
		description: nonEmptyText.optional(),
		coverImage: coverImageReference.optional(),
		draft: z.boolean().optional().default(false),
		categories: z.array(nonEmptyText),
		tags: z.array(nonEmptyText),
	})
	.strict()
	.superRefine((data, context) => {
		if (data.categories.length > 1) {
			context.addIssue({
				code: 'custom',
				path: ['categories'],
				message: '文章最多只能有一个分类',
			});
		}

		if (!data.draft && data.categories.length !== 1) {
			context.addIssue({
				code: 'custom',
				path: ['categories'],
				message: '正式文章必须且只能有一个分类',
			});
		}

		if (!data.draft && data.tags.length === 0) {
			context.addIssue({
				code: 'custom',
				path: ['tags'],
				message: '正式文章至少需要一个标签',
			});
		}

		if (new Set(data.tags).size !== data.tags.length) {
			context.addIssue({
				code: 'custom',
				path: ['tags'],
				message: '标签不能重复',
			});
		}
	})
	.transform((data) => ({
		...data,
		pubDate: data.date,
		updatedDate: data.updated,
	}));
