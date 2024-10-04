import { Link } from "./Link";

export interface MainLink {
  id: number;
  text: string;
  url: string;
  isExternal: boolean;
  nestedLinks: Link[]
}