"use client";

import Logo from "@/components/Logo";
import NavUser from "@/components/NavUser";
import NavSocial from "@/components/NavSocial";
import SearchBar from "@/components/SearchBar";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import config from "@/config/config.json";
import social from "@/config/social.json";
import menu from "@/config/menu.json";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import DynamicIcon from "@/helpers/DynamicIcon";
import { useChat } from "@/context/ChatContext";

interface IChildNavigationLink {
  name: string;
  url: string;
}

export interface ISocial {
  name: string;
  icon: string;
  link: string;
  target?: string;
}

interface INavigationLink {
  name: string;
  url: string;
  hasChildren?: boolean;
  children?: IChildNavigationLink[];
  enabled?: boolean;
}

const isMenuItemActive = (menu: INavigationLink, pathname: string) => {
  return (pathname === `${menu.url}/` || pathname === menu.url) && "nav-active";
};

const renderMenuItem = (
  menu: INavigationLink,
  pathname: string,
  handleToggleChildMenu: () => void,
  showChildMenu: boolean,
) => {
  return menu.hasChildren ? (
    <li className="nav-item group relative" key={menu.name}>
      <span
        className={`nav-link cursor-pointer inline-flex items-center ${
          menu.children?.some(
            ({ url }) => pathname === url || pathname === `${url}/`,
          ) && "active"
        }`}
        onClick={handleToggleChildMenu}
      >
        {menu.name}
        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </span>
      <ul
        className={`absolute top-full left-0 mt-2 bg-white dark:bg-darkmode-body rounded-md shadow-lg z-50 ${
          showChildMenu ? "block" : "hidden"
        } group-hover:block`}
      >
        {menu.children?.map((child, i) => (
          <li key={`child-${i}`}>
            <Link
              href={child.url}
              className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-darkmode-light ${isMenuItemActive(
                child,
                pathname,
              )}`}
            >
              {child.name}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  ) : (
    <li className="nav-item" key={menu.name}>
      <Link
        href={menu.url}
        className={`nav-link block ${isMenuItemActive(menu, pathname)}`}
      >
        {menu.name}
      </Link>
    </li>
  );
};

const Header: React.FC<{ children: any }> = ({ children }) => {
  const [navbarShadow, setNavbarShadow] = useState(false);
  const { main }: { main: INavigationLink[] } = menu;
  const { navigation_button, settings } = config;
  const pathname = usePathname();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showChildMenu, setShowChildMenu] = useState(false);

  useEffect(() => {
    window.scroll(0, 0);
    setShowSidebar(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setNavbarShadow(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
    setShowChildMenu(false);
  };

  const handleToggleChildMenu = () => {
    setShowChildMenu(!showChildMenu);
  };

  const { openChat } = useChat();

  return (
    <header
      id="headnav"
      className={`header z-30 ${settings.sticky_header && "sticky top-0"} ${
        navbarShadow ? "shadow-sm" : "shadow-none"
      }`}
    >
      <nav className="navbar flex-wrap container">
        <div className="flex items-center justify-between w-full py-4">
          {/* Left: Logo + Menu (desktop) */}
          <div className="flex items-center space-x-6">
            <Logo />

            <ul className="hidden md:flex items-center space-x-6">
              {main
                .filter((m) => m.enabled)
                .map((menu, i) => (
                  <React.Fragment key={`menu-${i}`}>
                    {renderMenuItem(
                      menu,
                      pathname,
                      handleToggleChildMenu,
                      showChildMenu,
                    )}
                  </React.Fragment>
                ))}
              {navigation_button.enable && (
                <li>
                  <Link
                    href={navigation_button.link}
                    className="btn btn-outline-primary btn-sm"
                  >
                    {navigation_button.label}
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Right: ThemeSwitcher, Account, Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            {/* social share */}
            <ul className="social-icons social-icons-footer">
              {social?.main.map((socialItem: ISocial) => (
                <li key={socialItem.name}>
                  {socialItem.link === "openChat" ? (
                    <button
                      type="button"
                      aria-label={socialItem.name}
                      onClick={openChat}
                    >
                      <span className="sr-only">{socialItem.name}</span>
                      <DynamicIcon
                        className="inline-block"
                        icon={socialItem.icon}
                      />
                    </button>
                  ) : (
                    <a
                      aria-label={socialItem.name}
                      href={socialItem.link}
                      target={socialItem.target ?? "_blank"}
                      rel="noopener noreferrer nofollow"
                    >
                      <span className="sr-only">{socialItem.name}</span>
                      <DynamicIcon
                        className="inline-block"
                        icon={socialItem.icon}
                      />
                    </a>
                  )}
                </li>
              ))}
            </ul>
            {/* <ThemeSwitcher className="mr-4 md:mr-6" />
            <Suspense fallback={children[0]}>{children[1]}</Suspense>
            {settings.account && (
              <div className="ml-4 md:ml-6">
                <NavSocial />
              </div>
            )}
            */}

            {/* Mobile Hamburger */}
            <button
              className="md:hidden p-2 border dark:border-border/40 rounded-md"
              onClick={handleToggleSidebar}
              aria-label="Toggle Menu"
            >
              {showSidebar ? (
                <svg className="h-5 w-5" viewBox="0 0 20 20">
                  <polygon
                    points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
                    transform="rotate(45 10 10)"
                  ></polygon>
                </svg>
              ) : (
                <svg className="h-5 w-5" viewBox="0 0 20 20">
                  <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-transform duration-300 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } transform`}
      >
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={handleToggleSidebar}
        ></div>

        <div className="fixed top-0 left-0 h-full w-72 bg-white dark:bg-darkmode-body p-6 overflow-y-auto shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <Logo />
            <button onClick={handleToggleSidebar} className="p-1">
              <svg className="h-5 w-5" viewBox="0 0 20 20">
                <polygon
                  points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
                  transform="rotate(45 10 10)"
                ></polygon>
              </svg>
            </button>
          </div>

          <ul className="space-y-4">
            {main
              .filter((m) => m.enabled)
              .map((menu, i) => (
                <React.Fragment key={`menu-mobile-${i}`}>
                  {renderMenuItem(
                    menu,
                    pathname,
                    handleToggleChildMenu,
                    showChildMenu,
                  )}
                </React.Fragment>
              ))}
            {navigation_button.enable && (
              <li>
                <Link
                  className="btn btn-outline-primary btn-sm block"
                  href={navigation_button.link}
                >
                  {navigation_button.label}
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
