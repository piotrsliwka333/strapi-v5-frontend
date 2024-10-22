import { Footer } from './Footer';
import { Header } from './Header';
import { Image } from './common/Image';
import { SEO } from './common/SEO';

export interface GlobalConfig {
  favicon: Image;
  header: Header;
  footer: Footer;
  seo: SEO;
}
