import { HttpClient } from '@/api/HttpClient';
import { Author as AuthorType } from '@/models/Author';
import { formatDate } from '@/utils/helpers';
import { ArticleKindType } from './Article';

interface AuthorProps {
  author: AuthorType;
  publishedAt: string;
  type: ArticleKindType;
}

export const Author = (props: AuthorProps) => {
  const { author, publishedAt, type } = props;

  return (
    <div
      className={`flex pt-4 items-center ${
        type === ArticleKindType.PRIMARY ? 'border-t border-secondary' : ''
      }`}
    >
      {/* because of reaching limit on vercel for image optimizations has to swich to normal images */}
      {/* <Image
        src={HttpClient.getStrapiMedia(author.avatar.url)}
        alt={author.avatar.alternativeText || 'not provided'}
        height={50}
        width={50}
        quality={100}
        sizes="50px"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMbSURBVHgB3Zq9ctpAEMdXx8AEKqXgo1SewLhLKbqU9hOENzDp0hFXmVSxy3R0aUmZKtCli/IEkTtmYIhSwBA+819ywsK2QAiM7/SbkSUfktm/9/Y+dmXQgSiVShZO9mw2OzEMw8ZhLhYLE22mfw/aXJzc+Xzu4OykUql2p9Nx6QAYtAcmyGQyNRj4GkZbFA8XzzYh6nofUbGE4L9v48vrOGw6LA0hxGUcQTsJ4e6DbvERl2f0uOwsKBX1xmKxWIMHPuOyTI9PGd91lsvlvOFw+DPKA5GE5PP5K5zqOJ7R8TAReyzGhJiv227e2LU4mNPp9Df8wWN4IRR4x5lMJhUPhN0TKkQVET7bxIiwB1USwbAtbFPY5w/GCMcE909SDNhUCouZe0IgoooH3pOiwLaX2Wz2D8R8X2sP/iLnCXafRQqDePGwEjgNzjNrMQIRPMRapDi8jpMT822bfyG98Ys0AvZWer1ei69FoLFOmgHPrGxeekRHb/iMx+PnPLcsPYI9xAVpCrYRS9uXQlScM3agyj8MnbuVD4ZiS6Bb2aQ50+nU5q51QvpTxkZMKLMwjAsnO8QeSQOVMLlrWaQ5nHYSlAB47ZUIIQwL8SgBJEWImwghCHaXh98W6Y/DHomUyVMcR2DB1SLNQb6rLeQG3iV9cbGvcv15pEGawrUVPi+3urJg85s0BFvdFyuP8J5Xx9ELNjdYBF+LQOMlaQaCfGXzSojMDzVJE4LeYNYWjehvb0iPmd4NeoNZS2KPRiMPCeK/WBa/IoWBN2r9fr8dbLuXjecsN6fuOetNCgIRV91u98Pd9tCKVaFQ+EHHKXxGhqtWEHH60GehGyvESwUnhxTBL72Ffb61GIqJkuslyhdDN5anEfyjwWDw6SljRsbEOduy6b5IdXau2UHMjSyOmnQceLXxFiIiTdSR33yAGAdV1S9I6JlHqPY2EaPnGGK3vijgE+ulGoSOBVF1CKrSAeH1Ho53WGW0d31239ecWNCFLEtYFA9+f6uBRPT1pmDexl5CgkhRNv1PipchzqJ1cZ5/yJU2j0Qt2H5DB+AfUKyLK1y1fcMAAAAASUVORK5CYII="
        style={{ objectFit: 'cover', overflow: 'hidden' }}
        // className="block"
        className="w-[50px] h-[50px] block rounded-full mr-4"
      /> */}
      <img
        src={HttpClient.getStrapiMedia(author.avatar.url)}
        alt={author.avatar.alternativeText || 'not provided'}
        className="w-[50px] h-[50px] block rounded-full mr-4"
      />
      <div>
        <p
          className={`text-sm font-semibold ${
            type === ArticleKindType.PRIMARY ? 'text-textPrimary' : 'text-white'
          }`}
        >
          {author.name}
        </p>
        <p
          className={`text-sm font-normal ${
            type === ArticleKindType.PRIMARY ? 'text-textPrimary' : 'text-white'
          }`}
        >
          {formatDate(publishedAt)}
        </p>
      </div>
    </div>
  );
};
