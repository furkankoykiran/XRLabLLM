#!/usr/bin/env node

/**
 * Verify the slide deck before it is deployed. The page is a single HTML file,
 * so this catches a broken head, a missing local asset, a stale Tailwind build
 * or the CDN script creeping back in.
 */

import { promises as fs } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve('.');
const CANONICAL = 'https://furkankoykiran.com.tr/XRLabLLM/';

const read = (file) => fs.readFile(resolve(ROOT, file), 'utf8');
const exists = (file) =>
  fs
    .access(resolve(ROOT, file))
    .then(() => true)
    .catch(() => false);

async function main() {
  const html = await read('index.html');
  const problems = [];

  if (!html.includes('<html lang="tr">')) problems.push('document language must be Turkish');
  const title = html.match(/<title>([^<]+)<\/title>/);
  if (!title) problems.push('title is missing');
  else if (title[1].length < 10 || title[1].length > 70) {
    problems.push(`title should be 10-70 characters, got ${title[1].length}`);
  }

  const description = html.match(/<meta name="description" content="([^"]+)"/);
  if (!description) problems.push('meta description is missing');
  else if (description[1].length < 50 || description[1].length > 200) {
    problems.push(`meta description should be 50-200 characters, got ${description[1].length}`);
  }

  if (!html.includes(`rel="canonical" href="${CANONICAL}"`)) {
    problems.push('canonical URL is missing or wrong');
  }
  if (!html.includes(`property="og:image" content="${CANONICAL}og-image.png"`)) {
    problems.push('Open Graph image is missing or not absolute');
  }
  if (!html.includes('name="twitter:card"')) problems.push('Twitter card is missing');
  if (html.includes('cdn.tailwindcss.com')) problems.push('the Tailwind CDN script is still present');
  if (!html.includes('href="css/tailwind.css"')) problems.push('the compiled stylesheet is not linked');

  const jsonLd = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!jsonLd) {
    problems.push('JSON-LD is missing');
  } else {
    try {
      const data = JSON.parse(jsonLd[1]);
      const types = (data['@graph'] ?? [data]).map((node) => node['@type']);
      if (!types.includes('LearningResource')) problems.push('LearningResource schema is missing');
    } catch (error) {
      problems.push(`JSON-LD does not parse: ${error.message}`);
    }
  }

  const required = [
    'index.html',
    '.nojekyll',
    'robots.txt',
    'sitemap.xml',
    'llms.txt',
    'ai.txt',
    'LICENSE',
    'README.md',
    '.well-known/security.txt',
    'og-image.png',
    'images/favicon.svg',
    'images/xai-image.jpg',
    'images/midjourney-image.jpg',
    'images/n8n.jpg',
    'css/tailwind.css',
  ];
  const checks = await Promise.all(required.map(exists));
  required.forEach((file, index) => {
    if (!checks[index]) problems.push(`${file} is missing`);
  });

  // Every local src/href must resolve inside the repository.
  const refs = [...html.matchAll(/(?:src|href)="([^"]+)"/g)]
    .map((match) => match[1])
    .filter((ref) => !/^(?:https?:|mailto:|#|data:)/.test(ref))
    .map((ref) => ref.split(/[?#]/)[0]);
  for (const ref of new Set(refs)) {
    if (!(await exists(ref))) problems.push(`referenced file does not exist: ${ref}`);
  }

  if (await exists('css/tailwind.css')) {
    const css = await read('css/tailwind.css');
    for (const utility of ['.text-5xl', '.bg-indigo-600', '.hidden']) {
      if (!css.includes(utility)) problems.push(`compiled CSS is missing ${utility}; run npm run build`);
    }
  }

  const slides = (html.match(/<div class="slide(?:\s|")/g) ?? []).length;
  if (slides < 10) problems.push(`expected the full deck, found only ${slides} slides`);

  if (problems.length > 0) {
    throw new Error(`Site verification failed:\n- ${problems.join('\n- ')}`);
  }

  console.log(`Verified deck: ${slides} slides, metadata, structured data and local assets are present.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
