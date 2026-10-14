/**
 * Hero 背景图走 R2 图床；换图时记得同步上传同名对象，否则所有页面 Hero 会一起裂图。
 */
const defaultBackgroundSrc =
  'https://pub-6cfdb3cbea98482aa951a8b1d2a212ac.r2.dev/blog-placeholder-1.webp';

/**
 * Hero copy and background settings for one page.
 */
export interface HeroSectionConfig {
  /**
   * Main hero headline text.
   */
  text: string;
  /**
   * Optional hero subtitle text.
   */
  subtitle?: string;
  /**
   * Hero background image URL.
   */
  backgroundImage: string;
}

/**
 * Centralized hero configuration for all top-level pages and post fallback.
 */
export interface HeroConfig {
  home: HeroSectionConfig;
  blog: HeroSectionConfig;
  tags: HeroSectionConfig;
  about: HeroSectionConfig;
  /**
   * Default hero image shared by all article pages.
   */
  postDefaultBackground: string;
}

export const heroConfig: HeroConfig = {
  home: {
    text: 'Don\'t give up on yourdesire',
    subtitle: '--Jacques Lacan',
    backgroundImage: defaultBackgroundSrc,
  },
  blog: {
    text: 'All Posts',
    subtitle: 'Browse all archive.',
    backgroundImage: defaultBackgroundSrc,
  },
  tags: {
    text: 'Tags',
    subtitle: 'Explore topics by category and tag.',
    backgroundImage: defaultBackgroundSrc,
  },
  about: {
    text: 'About',
    subtitle: 'My account link',
    backgroundImage: defaultBackgroundSrc,
  },
  postDefaultBackground: defaultBackgroundSrc,
};
