import { HttpClient } from '@/api/HttpClient';
import { Footer as FooterType, SocialLink, SocialLinkOption } from '@/models/Footer';
import Image from 'next/image';
import { Newsletter } from '../Newsletter';
import { Image as ImageType } from '@/models/common/Image';
import { MainLink } from '@/models/common/MainLink';
import { Link } from '@/i18n/routing';
import { Link as LinkType } from '@/models/common/Link';

interface OwnProps {
  footer: FooterType;
}

export function Footer({ footer }: Readonly<OwnProps>) {
  return (
    <footer className="py-24 pt-52 mt-32 bg-secondary text-white rounded-t-3xl relative">
      <Newsletter newsletter={footer.newsletter} />
      <div className="container mx-auto md:flex mb-16 md:mb-8 md:justify-between">
        <div className="mb-24 md:mb-0 md:basis-2/6">
          <h1 className="text-4xl font-bold mb-8">{footer.title}</h1>
          <p className="font-light mb-8">{footer.description}</p>
          <ul className="flex gap-4">
            {footer.brandLogos.map((brandLogo: ImageType) => (
              <li key={brandLogo.id}>
                <Image
                  priority
                  src={HttpClient.getStrapiMedia(brandLogo.url)}
                  alt={brandLogo.alternativeText || 'none provided'}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-[95px] h-[95px]"
                />
              </li>
            ))}
          </ul>
        </div>

        <ul className="grid gap-8 sm:justify-center sm:grid-cols-2 xl:grid-cols-3 md:basis-3/5 md:pl-8 xl:pl-16">
          {footer.mainLinks.map((mainLink: MainLink) => (
            <li key={mainLink.id} className="font-medium">
              {/* eslint-disable-next-line */}
              <Link href={mainLink.url as any} className="footer-nav-link block mb-2">
                <span>{mainLink.text}</span>
              </Link>
              {mainLink.nestedLinks.length > 0 && (
                <ul>
                  {mainLink.nestedLinks.map((nestedLink: LinkType) => (
                    <li key={nestedLink.id}>
                      <Link
                        // eslint-disable-next-line
                        href={nestedLink.url as any}
                        className="font-light block footer-nav-link"
                      >
                        {nestedLink.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <li key={'contact'}>
            <Link
              // eslint-disable-next-line
              href={footer.contact.link.url as any}
              className="font-medium footer-nav-link block mb-2"
            >
              <span>{footer.contact.link.text}</span>
            </Link>
            <Link
              // eslint-disable-next-line
              href={`mailto:${footer.contact.email}` as any}
              className="font-light footer-nav-link flex items-center group mb-2"
            >
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.38539 15.1513L4.11329 14.9705L3.38539 15.1513ZM3.38539 8.84875L2.6575 8.668H2.6575L3.38539 8.84875ZM21.6146 8.84876L22.3425 8.66801L21.6146 8.84876ZM21.6146 15.1512L22.3425 15.332V15.332L21.6146 15.1512ZM15.6156 20.659L15.4533 19.9267H15.4533L15.6156 20.659ZM9.38443 20.659L9.54668 19.9267L9.38443 20.659ZM9.38443 3.34105L9.22218 2.60881V2.60881L9.38443 3.34105ZM15.6156 3.34105L15.4533 4.07329L15.4533 4.07329L15.6156 3.34105ZM8.93055 20.5584L8.7683 21.2906L8.93055 20.5584ZM16.0694 20.5584L16.2317 21.2906H16.2317L16.0694 20.5584ZM16.0694 3.44162L16.2317 2.70938V2.70938L16.0694 3.44162ZM8.93056 3.44162L9.09281 4.17386H9.09281L8.93056 3.44162ZM5.23825 5.89015C4.90121 5.64936 4.43279 5.72738 4.192 6.06441C3.95121 6.40144 4.02923 6.86986 4.36626 7.11066L5.23825 5.89015ZM10.5825 10.63L10.1465 11.2403H10.1465L10.5825 10.63ZM14.4175 10.63L14.8535 11.2403L14.4175 10.63ZM20.6337 7.11066C20.9708 6.86986 21.0488 6.40144 20.808 6.06441C20.5672 5.72738 20.0988 5.64936 19.7618 5.89015L20.6337 7.11066ZM9.09281 4.17386L9.54668 4.07329L9.22218 2.60881L8.7683 2.70938L9.09281 4.17386ZM15.4533 4.07329L15.9072 4.17386L16.2317 2.70938L15.7778 2.60881L15.4533 4.07329ZM15.9072 19.8261L15.4533 19.9267L15.7778 21.3912L16.2317 21.2906L15.9072 19.8261ZM9.54668 19.9267L9.09281 19.8261L8.7683 21.2906L9.22218 21.3912L9.54668 19.9267ZM4.11329 14.9705C3.6289 13.0198 3.6289 10.9802 4.11329 9.02949L2.6575 8.668C2.11417 10.8561 2.11417 13.1439 2.6575 15.332L4.11329 14.9705ZM20.8867 9.0295C21.3711 10.9802 21.3711 13.0198 20.8867 14.9705L22.3425 15.332C22.8858 13.1439 22.8858 10.8561 22.3425 8.66801L20.8867 9.0295ZM15.4533 19.9267C13.508 20.3578 11.492 20.3578 9.54668 19.9267L9.22218 21.3912C11.3812 21.8696 13.6188 21.8696 15.7778 21.3912L15.4533 19.9267ZM9.54668 4.07329C11.492 3.64224 13.508 3.64224 15.4533 4.07329L15.7778 2.60881C13.6188 2.1304 11.3812 2.1304 9.22218 2.60881L9.54668 4.07329ZM9.09281 19.8261C6.64627 19.284 4.71736 17.4032 4.11329 14.9705L2.6575 15.332C3.39874 18.3171 5.76576 20.6253 8.7683 21.2906L9.09281 19.8261ZM16.2317 21.2906C19.2342 20.6253 21.6013 18.3171 22.3425 15.332L20.8867 14.9705C20.2826 17.4032 18.3537 19.284 15.9072 19.8261L16.2317 21.2906ZM15.9072 4.17386C18.3537 4.71598 20.2826 6.5968 20.8867 9.0295L22.3425 8.66801C21.6013 5.68288 19.2342 3.3747 16.2317 2.70938L15.9072 4.17386ZM8.7683 2.70938C5.76576 3.3747 3.39874 5.68288 2.6575 8.668L4.11329 9.02949C4.71736 6.59679 6.64627 4.71598 9.09281 4.17386L8.7683 2.70938ZM4.36626 7.11066L10.1465 11.2403L11.0185 10.0198L5.23825 5.89015L4.36626 7.11066ZM14.8535 11.2403L20.6337 7.11066L19.7618 5.89015L13.9815 10.0198L14.8535 11.2403ZM10.1465 11.2403C11.5543 12.2461 13.4456 12.2461 14.8535 11.2403L13.9815 10.0198C13.0953 10.653 11.9047 10.653 11.0185 10.0198L10.1465 11.2403Z"
                  className="fill-white group-hover:fill-secondary"
                />
              </svg>
              <span className="ml-2 block break-all">{footer.contact.email}</span>
            </Link>
            <Link
              // eslint-disable-next-line
              href={`tel:${footer.contact.phoneNumber}` as any}
              className="font-light footer-nav-link flex items-center group mb-3"
            >
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.6653 20.8835C16.5469 21.0388 17.4531 21.0388 18.3347 20.8835C19.7516 20.6338 20.8929 19.6826 21.286 18.4236L21.3694 18.1565C21.456 17.879 21.5 17.5919 21.5 17.3034C21.5 16.0313 20.3623 15 18.9589 15H15.0411C13.6377 15 12.5 16.0313 12.5 17.3034C12.5 17.5919 12.544 17.879 12.6306 18.1565L12.714 18.4236C13.1071 19.6826 14.2484 20.6338 15.6653 20.8835ZM15.6653 20.8835C9.54195 19.7489 4.75108 14.958 3.6165 8.83468M3.6165 8.83468C3.46117 7.95315 3.46117 7.04686 3.6165 6.16532C3.86618 4.74842 4.81744 3.60713 6.07641 3.21402L6.34345 3.13063C6.62103 3.04396 6.90813 3 7.19661 3C8.46874 3 9.50001 4.13768 9.5 5.54106L9.5 9.45894C9.50001 10.8623 8.46874 12 7.19661 12C6.90813 12 6.62103 11.956 6.34345 11.8694L6.07641 11.786C4.81744 11.3929 3.86618 10.2516 3.6165 8.83468Z"
                  className="stroke-white group-hover:stroke-secondary"
                  strokeWidth="1.5"
                />
              </svg>
              <span className="ml-2 inline-block">{footer.contact.phoneNumber}</span>
            </Link>
            {footer.contact.socialLinks.length > 0 && (
              <ul className="flex items-center font-extralight w-full">
                {footer.contact.socialLinks.map((socialLink: SocialLink) => (
                  <li key={socialLink.id}>
                    <Link
                      target="_blank"
                      aria-label={`${socialLink.type} icon`}
                      // eslint-disable-next-line
                      href={socialLink.url as any}
                      className="p-2.5 block footer-nav-link group"
                    >
                      {RenderSocialIcon(socialLink.type)}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </div>
      <small className="container mx-auto block text-center">{footer.legalInformation}</small>
    </footer>
  );
}

const RenderSocialIcon = (social: SocialLinkOption): JSX.Element | null => {
  switch (social) {
    case SocialLinkOption.FACEBOOK:
      return (
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="fill-white group-hover:fill-[#1877F2]"
            d="M17 6H14C13.4477 6 13 6.44772 13 7V10H17C17.1137 9.99748 17.2216 10.0504 17.2892 10.1419C17.3568 10.2334 17.3758 10.352 17.34 10.46L16.6 12.66C16.5318 12.8619 16.3431 12.9984 16.13 13H13V20.5C13 20.7761 12.7761 21 12.5 21H10C9.72386 21 9.5 20.7761 9.5 20.5V13H8C7.72386 13 7.5 12.7761 7.5 12.5V10.5C7.5 10.2239 7.72386 10 8 10H9.5V7C9.5 4.79086 11.2909 3 13.5 3H17C17.2761 3 17.5 3.22386 17.5 3.5V5.5C17.5 5.77614 17.2761 6 17 6Z"
          />
        </svg>
      );
    case SocialLinkOption.X:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className=" "
          width="25"
          height="26"
          viewBox="0 0 512 512"
        >
          <path
            className="fill-white group-hover:fill-black"
            d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
          />
        </svg>
      );
    case SocialLinkOption.YOUTUBE:
      return (
        <svg
          width="25"
          height="26"
          viewBox="0 0 25 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_1_1535)">
            <path
              d="M24.0221 8.1859C23.8864 7.67531 23.619 7.20932 23.2466 6.83455C22.8743 6.45979 22.41 6.1894 21.9003 6.05044C20.0239 5.5459 12.5239 5.5459 12.5239 5.5459C12.5239 5.5459 5.02393 5.5459 3.14756 6.05044C2.63786 6.1894 2.17358 6.45979 1.80121 6.83455C1.42884 7.20932 1.16143 7.67531 1.02574 8.1859C0.523926 10.0704 0.523926 14.0004 0.523926 14.0004C0.523926 14.0004 0.523926 17.9304 1.02574 19.815C1.16143 20.3256 1.42884 20.7916 1.80121 21.1663C2.17358 21.5411 2.63786 21.8115 3.14756 21.9504C5.02393 22.455 12.5239 22.455 12.5239 22.455C12.5239 22.455 20.0239 22.455 21.9003 21.9504C22.41 21.8115 22.8743 21.5411 23.2466 21.1663C23.619 20.7916 23.8864 20.3256 24.0221 19.815C24.5239 17.9304 24.5239 14.0004 24.5239 14.0004C24.5239 14.0004 24.5239 10.0704 24.0221 8.1859Z"
              className="fill-white group-hover:fill-[#CD201F]"
            />
            <path
              d="M10.0693 17.5689V10.4316L16.3421 14.0003L10.0693 17.5689Z"
              className="fill-[#212C6A] group-hover:fill-white"
            />
          </g>
          <defs>
            <clipPath id="clip0_1_1535">
              <rect width="24" height="24" fill="white" transform="translate(0.5 2)" />
            </clipPath>
          </defs>
        </svg>
      );
    case SocialLinkOption.INSTAGRAM:
      return (
        <svg
          width="27"
          height="26"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="fill-white group-hover:fill-[#833AB4]"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.5 3H8.5C5.73858 3 3.5 5.23858 3.5 8V16C3.5 18.7614 5.73858 21 8.5 21H16.5C19.2614 21 21.5 18.7614 21.5 16V8C21.5 5.23858 19.2614 3 16.5 3ZM19.75 16C19.7445 17.7926 18.2926 19.2445 16.5 19.25H8.5C6.70735 19.2445 5.25549 17.7926 5.25 16V8C5.25549 6.20735 6.70735 4.75549 8.5 4.75H16.5C18.2926 4.75549 19.7445 6.20735 19.75 8V16ZM17.25 8.25C17.8023 8.25 18.25 7.80228 18.25 7.25C18.25 6.69772 17.8023 6.25 17.25 6.25C16.6977 6.25 16.25 6.69772 16.25 7.25C16.25 7.80228 16.6977 8.25 17.25 8.25ZM12.5 7.5C10.0147 7.5 8 9.51472 8 12C8 14.4853 10.0147 16.5 12.5 16.5C14.9853 16.5 17 14.4853 17 12C17.0027 10.8057 16.5294 9.65957 15.6849 8.81508C14.8404 7.97059 13.6943 7.49734 12.5 7.5ZM9.75 12C9.75 13.5188 10.9812 14.75 12.5 14.75C14.0188 14.75 15.25 13.5188 15.25 12C15.25 10.4812 14.0188 9.25 12.5 9.25C10.9812 9.25 9.75 10.4812 9.75 12Z"
          />
        </svg>
      );
    case SocialLinkOption.LINKEDIN:
      return (
        <svg
          width="27"
          height="26"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="fill-white group-hover:fill-[#0077B5]"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.5 3H19.5C20.6046 3 21.5 3.89543 21.5 5V19C21.5 20.1046 20.6046 21 19.5 21H5.5C4.39543 21 3.5 20.1046 3.5 19V5C3.5 3.89543 4.39543 3 5.5 3ZM8.5 18C8.77614 18 9 17.7761 9 17.5V10.5C9 10.2239 8.77614 10 8.5 10H7C6.72386 10 6.5 10.2239 6.5 10.5V17.5C6.5 17.7761 6.72386 18 7 18H8.5ZM7.75 9C6.92157 9 6.25 8.32843 6.25 7.5C6.25 6.67157 6.92157 6 7.75 6C8.57843 6 9.25 6.67157 9.25 7.5C9.25 8.32843 8.57843 9 7.75 9ZM18 18C18.2761 18 18.5 17.7761 18.5 17.5V12.9C18.5325 11.3108 17.3576 9.95452 15.78 9.76C14.677 9.65925 13.6083 10.1744 13 11.1V10.5C13 10.2239 12.7761 10 12.5 10H11C10.7239 10 10.5 10.2239 10.5 10.5V17.5C10.5 17.7761 10.7239 18 11 18H12.5C12.7761 18 13 17.7761 13 17.5V13.75C13 12.9216 13.6716 12.25 14.5 12.25C15.3284 12.25 16 12.9216 16 13.75V17.5C16 17.7761 16.2239 18 16.5 18H18Z"
          />
        </svg>
      );
    default:
      return null;
  }
};
