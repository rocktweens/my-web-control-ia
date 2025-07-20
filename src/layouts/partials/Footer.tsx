"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "@/components/LogoFooter";
import config from "@/config/config.json";
import menu from "@/config/menu.json";
import contacts from "@/config/contacts.json";
import contactsPages from "@/config/contacts-pages.json";
import DynamicIcon from "@/helpers/DynamicIcon";
import { markdownify } from "@/lib/utils/textConverter";
import Link from "next/link";

export interface ISocial {
  name: string;
  icon: string;
  link: string;
  target: string;
}

const Footer = () => {
  const { copyright, logo } = config.params;
  const pathname = usePathname();
  const [socialIcons, setSocialIcons] = useState<ISocial[]>(
    contacts?.main || [],
  );


  useEffect(() => {
    const arrayLastReferer=(pathname||"").split("/");
    if(arrayLastReferer?.length>2 && !arrayLastReferer[arrayLastReferer?.length-1].includes("#")){
      setSocialIcons(contactsPages.main);
    }else{
      setSocialIcons(contacts.main);
    }
  }, [pathname]);



  return (
    <footer className="bg-light dark:bg-darkmode-light">
      <div className="container-fourth">
        <div className="flex flex-col md:flex-row justify-between items-center py-10 md:pt-20 md:pb-14">
          <Logo src={logo} />

          {/*  <ul className="flex gap-x-4 lg:gap-x-10 my-3">
            {menu.footer.map((menu) => (
              <li className="footer-link" key={menu.name}>
                <Link href={menu.url}>{menu.name}</Link>
              </li>
            ))}
          </ul> */}
          <span>
            © 2025 ControlIA Consulting · Especialistas en Control de Gestión
          </span>

          {/* contact share */}
          <ul className="social-icons social-icons-footer">
            {socialIcons?.map((contact: ISocial) => (
              <li key={contact.name}>
                <a
                  aria-label={contact.name}
                  href={contact.link}
                  target={contact.target ?? "_blank"}
                  rel="noopener noreferrer nofollow"
                >
                  <span className="sr-only">{contact.name}</span>
                  <DynamicIcon className="inline-block" icon={contact.icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-border py-5 dark:border-darkmode-border">
          {/*  <div className="flex flex-col md:flex-row gap-y-2 justify-between items-center text-text-light dark:text-darkmode-text-light">
            <ul className="flex gap-x-4">
              {menu.footerCopyright.map((menu) => (
                <li className="footer-link" key={menu.name}>
                  <Link href={menu.url}>{menu.name}</Link>
                </li>
              ))}
            </ul>

            <p
              className="text-sm font-light"
              dangerouslySetInnerHTML={markdownify(copyright)}
            />
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
