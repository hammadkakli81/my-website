import { FC, ReactElement } from 'react';
import Icons from './icons';
import styles from './social-media-icons.module.scss';

interface IconsInterface {
  type: 'facebook' | 'twitter' | 'linkedin' | 'instagram' | 'youtube';
  href: string;
}

const icons: IconsInterface[] = [
  { type: 'youtube', href: 'https://www.youtube.com/@hammadkakli' },
  { type: 'twitter', href: 'https://twitter.com/hammadkakli' },
  { type: 'instagram', href: 'https://www.instagram.com/hammadkakli' },
  { type: 'linkedin', href: 'https://pk.linkedin.com/in/hammadkakli' },
  { type: 'facebook', href: 'https://www.facebook.com/hammadkakli' },
];

interface SocialMediaIconsProps {
  fillColor: 'light' | 'dark';
  className?: string;
}

const SocialMediaIcons: FC<SocialMediaIconsProps> = ({
  fillColor,
  className,
}): ReactElement => {
  return (
    <ul className={`${styles.icons} ${className}`}>
      {icons.map(({ type, href }, i) => {
        return (
          <li key={i} className={styles.icon_list_item}>
            <a
              target="_blank"
              rel="noreferrer"
              href={href}
              className={styles.icon_link}
            >
              <Icons
                className={`${styles.icon} ${
                  fillColor === 'dark' ? styles.icon__dark : styles.icon__light
                }`}
                type={type}
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default SocialMediaIcons;
