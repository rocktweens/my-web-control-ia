"use client";

import ImageFallback from "@/helpers/ImageFallback";
import { markdownify } from "@/lib/utils/textConverter";
import { AboutUsItem } from "@/types";

const AboutMePerson = ({ abouts }: { abouts: Array<AboutUsItem> }) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6 lg:px-0">
        {abouts?.map((section, index) => (
          <div
            key={section.title}
            className="relative mb-12 lg:mb-16 rounded-2xl overflow-hidden"
          >
            {/* Imagen de fondo */}
            <div className="absolute inset-0 z-0">
              {/* <ImageFallback
                className="w-full h-full object-cover opacity-30"
                src={section.image}
                fallback="/images/curriculo-origin.png"
                fill
                alt={section.title}
              /> */}
              <div className="absolute inset-0 bg-thirteen dark:bg-thirteen backdrop-blur-sm"></div>
            </div>

            {/* Contenido */}
            <div className="relative z-10 flex items-center justify-center min-h-[400px] px-6 lg:px-12">
              <div className="prose prose-lg text-center text-gray-800 dark:prose-invert max-w-4xl">
                <h2 className="text-4xl font-bold text-white dark:text-white mb-6 py-6">
                  {section.title}
                </h2>
              {/*   <div className="mt-1 flex flex-col items-center">
                  <div className="text-text-dark dark:text-white mb-4">
                    <ImageFallback
                      height={50}
                      width={50}
                      className="rounded-full"
                      src={section.image}
                      alt={section.title}
                    />
                  </div>
                </div> */}
                <div className="text-white dark:text-white" dangerouslySetInnerHTML={markdownify(section.content)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutMePerson;
