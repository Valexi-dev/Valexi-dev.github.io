/**
 * Site-level settings shared by header, SEO tags, and feed generation.
 */
export interface SiteConfig {
  siteUrl: string;
  siteTitle: string;
  siteTitleSuffix: string;
  siteDescription: string;
  locale: string;
  headerGithubRepoUrl: string;
  faviconIco: string;
}

export const siteConfig: SiteConfig = {
  siteUrl: 'https://valexi-dev.github.io',
  siteTitle: '维多利亚港',
  siteTitleSuffix: '个人博客',
  siteDescription: 'A configurable Astro blog theme with centralized config and zero-content defaults.',
  locale: 'zh-CN',
  headerGithubRepoUrl: 'https://github.com/Valexi-dev/Valexi-dev.github.io',
  faviconIco: '/favicon.ico',
};

export const { siteUrl, siteTitle, siteTitleSuffix, siteDescription, locale, headerGithubRepoUrl, faviconIco } = siteConfig;
