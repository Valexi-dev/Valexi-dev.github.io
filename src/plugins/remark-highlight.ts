import type { Root, Text } from 'mdast';
import { visit } from 'unist-util-visit';

const highlightPattern = /(?<![=])==(?![=])([^\n]+?)(?<![=])==(?![=])/g;

export default function remarkHighlight() {
	return (tree: Root) => {
		visit(tree, 'text', (node, index, parent) => {
			if (index == null || !parent) return;

			const children: Text[] = [];
			let lastIndex = 0;

			for (const match of node.value.matchAll(highlightPattern)) {
				const matchIndex = match.index;
				if (matchIndex > lastIndex) {
					children.push({ type: 'text', value: node.value.slice(lastIndex, matchIndex) });
				}

				children.push({
					type: 'text',
					value: match[1],
					data: { hName: 'mark' },
				});
				lastIndex = matchIndex + match[0].length;
			}

			if (lastIndex === 0) return;
			if (lastIndex < node.value.length) {
				children.push({ type: 'text', value: node.value.slice(lastIndex) });
			}

			parent.children.splice(index, 1, ...children);
			return index + children.length;
		});
	};
}
