"use client";

import ImageFallback from "@/helpers/ImageFallback";
import { markdownify } from "@/lib/utils/textConverter";
import { AboutUsItem } from "@/types";
import { FaFileExcel, FaUniversity } from "react-icons/fa";
import { FiActivity  } from "react-icons/fi"; // Debes instalar este ícono si no lo tienes: react-icons

const AboutMePerson = ({ abouts }: { abouts: Array<AboutUsItem> }) => {
  return (
    <section>
      <div className="container">
        <div className="lg:grid lg:grid-cols-4 gap-8">
          {/* Columna principal: Información del currículum */}
          <div className="lg:col-span-3">
            {abouts?.map((section: AboutUsItem, index: number) => (
              <div
                className="lg:flex gap-8 mt-14 lg:mt-3"
                key={section?.title}
              >
                {index % 2 === 0 ? (
                  <>
                    <ImageFallback
                      className="rounded-md mx-auto"
                      src={section?.image}
                      width={536}
                      height={449}
                      alt={section?.title}
                    />
                    <div className="mt-10 lg:mt-0">
                      <h2>{section?.title}</h2>
                      <p
                        className="mt-4 text-text-light dark:text-darkmode-text-light leading-7"
                        dangerouslySetInnerHTML={markdownify(section?.content)}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <h2>{section.title}</h2>
                      <p
                        className="mt-4 text-text-light dark:text-darkmode-text-light leading-7"
                        dangerouslySetInnerHTML={markdownify(section.content)}
                      />
                    </div>
                    <ImageFallback
                      className="rounded-md mx-auto mt-10 lg:mt-0"
                      src={section.image}
                      width={536}
                      height={449}
                      alt={section.title}
                    />
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Columna lateral: Herramientas */}
        {/*   <aside className="hidden lg:flex flex-col items-center gap-6 mt-14 lg:mt-3">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4">Herramientas</h3>
              <ul className="space-y-4">
                <li className="flex flex-col items-center text-sm">
                  <FiActivity  className="text-3xl" />
                  <span className="mt-1">PowerBuilder</span>
                </li>
                <li className="flex flex-col items-center text-sm">
                  <FaFileExcel className="text-3xl" />
                  <span className="mt-1">Excel</span>
                </li>
                <li className="flex flex-col items-center text-sm">
                  <FaUniversity className="text-3xl" />
                  <span className="mt-1 text-center">Lic. en Finanzas</span>
                </li>
              </ul>
            </div>
          </aside> */}
        </div>
      </div>
    </section>
  );
};

export default AboutMePerson;
