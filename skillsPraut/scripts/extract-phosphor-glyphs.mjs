#!/usr/bin/env node
// Extract Phosphor icon glyph mapping (icon-name → unicode codepoint)
// from the Phosphor regular style.css and write JSON.
//
// Usage:
//   node scripts/extract-phosphor-glyphs.mjs
//
// Output:
//   src/components/icons/phosphor-glyphs.json

import {readFileSync, writeFileSync, mkdirSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..', '..');

const styleCssPath = resolve(
	repoRoot,
	'phosphor-icons',
	'Fonts',
	'regular',
	'style.css',
);
const outPath = resolve(
	__dirname,
	'..',
	'src',
	'components',
	'icons',
	'phosphor-glyphs.json',
);

const css = readFileSync(styleCssPath, 'utf8');

// Match `.ph.ph-<name>:before { content: "\<hex>"; }`
const re = /\.ph\.ph-([a-z0-9-]+):before\s*\{\s*content:\s*"\\([0-9a-fA-F]+)";?\s*\}/g;

const glyphs = {};
let m;
while ((m = re.exec(css)) !== null) {
	const name = m[1];
	const hex = m[2];
	glyphs[name] = String.fromCodePoint(parseInt(hex, 16));
}

const count = Object.keys(glyphs).length;
if (count === 0) {
	console.error('No glyphs extracted — check the style.css path & regex.');
	process.exit(1);
}

mkdirSync(dirname(outPath), {recursive: true});
writeFileSync(outPath, JSON.stringify(glyphs, null, 2) + '\n', 'utf8');

console.log(`Extracted ${count} glyphs → ${outPath}`);
