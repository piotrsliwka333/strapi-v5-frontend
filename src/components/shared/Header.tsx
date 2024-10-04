'use client';

import { Link } from '@/i18n/routing';
import { Header as HeaderResponseType } from '@/models/Header';
import Image from 'next/image';
import { useState } from 'react';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import { HttpClient } from '@/api/HttpClient';
import { MainLink } from '@/models/common/MainLink';
import { Link as LinkType } from '@/models/common/Link';

interface OwnProps {
  header: HeaderResponseType;
}

export function Header({ header }: Readonly<OwnProps>) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="pt-[68px]">
      <header className="flex justify-center bg-white shadow-md dark:bg-white dark:text-black top-0 fixed w-full z-50 h-[68px]">
        {/* mobile nav */}
        <div className="w-full mx-auto px-1 sm:px-2 flex items-center justify-between h-full xl:hidden">
          <div className="flex items-center gap-16 h-full">
            <Link href="/" className="py-2 flex h-full">
              <Image
                priority
                src={HttpClient.getStrapiMedia(header.logo.image.url)}
                alt={header.logo.text}
                width={0}
                height={0}
                sizes="100vw"
                className="h-full w-auto"
              />
            </Link>
          </div>
          <div className="flex items-center">
            {/* <ToggleThemeButton /> */}
            <LocaleSwitcher />
            <button
              onClick={handleClick}
              aria-label="Menu Burger"
              className="flex flex-col justify-center items-center p-4"
            >
              <span
                className={`bg-black block transition-all duration-300 ease-out 
                    h-0.5 w-6 rounded-sm ${
                      isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
                    }`}
              ></span>
              <span
                className={`bg-black block transition-all duration-300 ease-out 
                    h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'}`}
              ></span>
              <span
                className={`bg-black block transition-all duration-300 ease-out 
                    h-0.5 w-6 rounded-sm ${
                      isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
                    }`}
              ></span>
            </button>
          </div>
          <nav
            onClick={handleClick}
            className={`bg-white left-0 top-[68px] absolute w-full h-[calc(100vh-68px)] ${
              isOpen ? '' : 'hidden'
            }`}
          >
            <ul className="h-full overflow-y-auto p-4">
              <li className="mb-4">
                <Link
                  className="btn-primary flex items-center w-fit"
                  // eslint-disable-next-line
                  href={header.button.url as any}
                  target="_blank"
                >
                  <span className="flex items-center mr-3">{header.button.text}</span>
                  <svg
                    width="15"
                    height="12"
                    viewBox="0 0 15 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 6H13M13 6L8.41176 2M13 6L8.41176 10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </li>
              {header.mainLinks.map((mainLink: MainLink) => (
                <li key={mainLink.id} className="mb-2">
                  {/* eslint-disable-next-line */}
                  <Link href={mainLink.url as any} className="mobile-nav-link text-lg">
                    <span>{mainLink.text}</span>
                  </Link>
                  {mainLink.nestedLinks.length > 0 && (
                    <div className="pl-8">
                      <ul>
                        {mainLink.nestedLinks.map((nestedLink: LinkType) => (
                          <li key={nestedLink.id}>
                            <Link
                              className="mobile-nav-link font-light"
                              // eslint-disable-next-line
                              href={nestedLink.url as any}
                            >
                              {nestedLink.text}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* desktop nav */}
        <div className="hidden xl:flex w-full mx-auto max-w-[1544px] px-2 2xl:px-4 flex items-center justify-between relative h-full">
          <div className="flex items-center gap-16 h-full">
            <Link href="/" className="py-2 flex h-full">
              <Image
                priority
                src={HttpClient.getStrapiMedia(header.logo.image.url)}
                alt={header.logo.text}
                width={0}
                height={0}
                sizes="100vw"
                className="h-full w-auto"
              />
            </Link>
            <nav className="flex items-center h-full">
              <ul className="flex items-center h-full">
                {header.mainLinks.map((mainLink: MainLink) => (
                  <li key={mainLink.id} className="h-full">
                    {/* eslint-disable-next-line */}
                    <Link className="nav-link" href={mainLink.url as any}>
                      <span className="block relative">
                        {mainLink.text}
                        {mainLink.nestedLinks.length > 0 && (
                          <svg
                            className="absolute right-[-13px] top-[9px] translate-y-1/2"
                            width="8"
                            height="5"
                            viewBox="0 0 8 5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_61_3148)">
                              <path
                                d="M7 1L4 4L1 1"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_61_3148">
                                <rect width="8" height="5" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        )}
                      </span>
                    </Link>
                    {mainLink.nestedLinks.length > 0 && (
                      <div className="sub-menu__wrapper">
                        <ul className="sub-menu">
                          {mainLink.nestedLinks.map((nestedLink: LinkType) => (
                            <li key={nestedLink.id}>
                              {/* eslint-disable-next-line */}
                              <Link className="nav-link p-6" href={nestedLink.url as any}>
                                {nestedLink.text}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="flex items-center">
            <LocaleSwitcher />
            <Link
              className="btn-primary flex items-center"
              // eslint-disable-next-line
              href={header.button.url as any}
              target="_blank"
            >
              <span className="flex items-center mr-3">{header.button.text}</span>
              <svg
                width="15"
                height="12"
                viewBox="0 0 15 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 6H13M13 6L8.41176 2M13 6L8.41176 10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
  // return (
  //   <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md dark:bg-gray-800">
  //     <div className="flex items-center gap-4">
  //       {user.ok ? (
  //         <div className="flex items-center gap-4">
  //           <Link href="/dashboard">Dashboard</Link>
  //           <Link href="/">Home</Link>
  //           <Link href="/pricing">Pricing</Link>
  //           <Link href="/blog">Blog</Link>
  //           <LoggedInUser userData={user.data} />
  //           <LocaleSwitcher />
  //         </div>
  //       ) : (
  //         <div className="flex items-center gap-4">
  //           <Link href="/">Home</Link>
  //           <Link href="/pricing">Pricing</Link>
  //           <Link href="/blog">Blog</Link>
  //           <Link href="/signin">Sign In</Link>
  //           <Link href="/signup">Sign Up</Link>
  //           <Link href="/dashboard">Dashboard</Link>
  //           <LocaleSwitcher />
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );
}
