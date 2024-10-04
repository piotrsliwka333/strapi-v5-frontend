import { Image } from "./common/Image";
import { Link } from "./common/Link";
import { MainLink } from "./common/MainLink";

export interface Newsletter {
  id: number;
  title: string;
  buttonText: string;
  inputPlaceholder: string;
  image: Image;
}

export enum SocialLinkOption {
  FACEBOOK = 'FACEBOOK',
  INSTAGRAM = 'INSTAGRAM',
  X = 'X',
  LINKEDIN = 'LINKEDIN',
  YOUTUBE = 'YOUTUBE',
}

export interface SocialLink {
  id: number;
  url: string;
  type: SocialLinkOption;
}

export interface FooterContact {
  id: number;
  link: Link;
  email: string;
  phoneNumber: string;
  socialLinks: SocialLink[]
  legalInformation: string;
}

export interface Footer {
  id: number;
  title: string;
  description: string;
  legalInformation: string;
  brandLogos: Image[];
  mainLinks: MainLink[];
  newsletter: Newsletter;
  contact: FooterContact;
}
