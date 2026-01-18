// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import cloudflare from '@astrojs/cloudflare';
import { readFileSync } from 'node:fs';

const siteConfig = JSON.parse(readFileSync('./site.config.json', 'utf-8'));
const siteUrl = `https://${siteConfig.subdomain}.xiyo.dev`;

export default defineConfig({
	site: siteUrl,
	output: 'static',
	adapter: cloudflare(),
	integrations: [
		starlight({
			title: siteConfig.title,
			defaultLocale: 'root',
			locales: {
				root: { label: '한국어', lang: 'ko-KR' }
			},
			customCss: ['./src/styles/custom.css'],
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: `https://github.com/${siteConfig.githubRepo}`,
				},
			],
			sidebar: [
				{ label: '기초 및 핵심 원칙', autogenerate: { directory: 'foundations' } },
				{ label: '심화 프롬프트 전략', autogenerate: { directory: 'advanced-techniques' } },
			],
		}),
	],
});
