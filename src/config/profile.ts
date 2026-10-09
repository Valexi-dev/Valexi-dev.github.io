import type { ImageMetadata } from 'astro';
import defaultAvatar from '../assets/profile.jpg';

/**
 * Allowed social entry keys in profile configuration.
 */
export type ProfileSocialKey = 'github' | 'gitee' | 'csdn' | 'x' | 'email' | 'website';

/**
 * One social link item rendered on `/about`.
 */
export interface ProfileSocialLink {
  key: ProfileSocialKey;
  label: string;
  url: string;
}

/**
 * Personal profile settings used by About page and article author schema.
 */
export interface ProfileConfig {
  /**
   * Optional avatar URL for About page and structured data.
   */
  avatar?: string | ImageMetadata;
  /**
   * Display name used across the site.
   */
  name: string;
  /**
   * Short headline/title shown on About page.
   */
  title: string;
  /**
   * Short bio text shown on About page and in schema.
   */
  bio: string;
  /**
   * Optional location text.
   */
  location?: string;
  /**
   * Optional contact email.
   */
  email?: string;
  /**
   * Personal GitHub profile URL (separate from repo URL).
   */
  githubProfileUrl: string;
  /**
   * Social links displayed in About page social row.
   */
  socials: ProfileSocialLink[];
}

export const profileConfig: ProfileConfig = {
  avatar: defaultAvatar,
  name: 'Valexi',
  title: 'C++后端开发',
  bio: '热爱计算机，同时怕忘记自己的知识...',
  location: '济南',
  email: 'valexi.dev@gmail.com',
  githubProfileUrl: 'https://github.com/Valexi-dev',
  socials: [
    { key: 'github', label: 'GitHub', url: 'https://github.com/Valexi-dev/' },
    { key: 'gitee', label: 'Gitee', url: 'https://gitee.com/ValExi/' },
    { key: 'csdn', label: 'CSDN', url: 'https://blog.csdn.net/suimingtao' },
  ],
};
