import { HttpClient } from '@/api/HttpClient';
import { Footer, SocialLink } from '@/models/Footer';
import Image from 'next/image';
import { Newsletter } from '../Newsletter';
import { Image as ImageType } from '@/models/common/Image';
import { RenderSocialIcon } from '@/utils/RenderSocialIcon';
import { MainLink } from '@/models/common/MainLink';
import { Link } from '@/i18n/routing';
import { Link as LinkType } from '@/models/common/Link';

interface OwnProps {
  footer: Footer;
}

export function Footer({ footer }: Readonly<OwnProps>) {
  return (
    <footer className="py-24 pt-52 mt-32 bg-secondary text-white rounded-t-3xl relative">
      <Newsletter newsletter={footer.newsletter} />
      <div className="container mx-auto md:flex mb-16 md:mb-8 md:justify-between">
        <div className="mb-24 md:mb-0 md:basis-2/6">
          <h6 className="text-4xl font-bold mb-8">{footer.title}</h6>
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
              <Link href={mainLink.url as any} className="footer-nav-link block mb-2">
                <span>{mainLink.text}</span>
              </Link>
              {mainLink.nestedLinks.length > 0 && (
                <ul>
                  {mainLink.nestedLinks.map((nestedLink: LinkType) => (
                    <li key={nestedLink.id}>
                      <Link
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
              href={footer.contact.link.url as any}
              className="font-medium footer-nav-link block mb-2"
            >
              <span>{footer.contact.link.text}</span>
            </Link>
            <Link
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
