import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { describe, expect, it } from 'vitest';
import type { Root } from 'mdast';
import type { Node } from 'unist';
import remarkHighlight from './remark-highlight';

function isRoot(node: Node): node is Root {
	return node.type === 'root' && 'children' in node;
}

describe('remark highlight', () => {
	it('converts ==text== into mark elements and leaves inline code unchanged', () => {
		const processor = unified().use(remarkParse).use(remarkHighlight);
		const tree = processor.parse('Before ==highlighted text== after `==inline code==`.');
		const transformed = processor.runSync(tree);
		expect(isRoot(transformed)).toBe(true);
		if (!isRoot(transformed)) return;
		const paragraph = transformed.children[0];

		expect(paragraph.type).toBe('paragraph');
		if (paragraph.type !== 'paragraph') return;

		expect(paragraph.children).toMatchObject([
			{ type: 'text', value: 'Before ' },
			{ type: 'text', value: 'highlighted text', data: { hName: 'mark' } },
			{ type: 'text', value: ' after ' },
			{ type: 'inlineCode', value: '==inline code==' },
			{ type: 'text', value: '.' },
		]);
	});

	it('does not interpret triple-equals delimiters as highlighting', () => {
		const processor = unified().use(remarkParse).use(remarkHighlight);
		const transformed = processor.runSync(processor.parse('===not highlighted==='));
		expect(isRoot(transformed)).toBe(true);
		if (!isRoot(transformed)) return;
		const paragraph = transformed.children[0];

		expect(paragraph.type).toBe('paragraph');
		if (paragraph.type !== 'paragraph') return;

		expect(paragraph.children).toMatchObject([{ type: 'text', value: '===not highlighted===' }]);
	});
});
