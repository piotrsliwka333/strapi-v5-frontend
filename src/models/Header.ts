import { Image } from "./common/Image";
import { Link } from "./common/Link";
import { MainLink } from "./common/MainLink";

export interface Header {
  id: number;
  logo: {
    id: number;
    text: string;
    image: Image;
  };
  mainLinks: MainLink[];
  button: Link;
}
