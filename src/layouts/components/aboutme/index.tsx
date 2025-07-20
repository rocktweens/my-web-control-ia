"use client";

import { markdownify } from "@/lib/utils/textConverter";
import { AboutUsItem } from "@/types";

const AboutMePerson = ({ abouts }: { abouts: Array<AboutUsItem> }) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6 lg:px-0">
        {abouts?.map((section, index) => (
          <div
            key={section.title}
            className="relative mb-8 rounded-xl overflow-hidden shadow-lg"
          >
            {/* Imagen de fondo */}
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-thirteen dark:bg-thirteen backdrop-blur-sm"></div>
            </div>

            {/* Contenido */}
            <div className="relative z-10 flex items-center justify-center min-h-[400px] px-6 py-10 lg:py-16 text-center">
              <div className="max-w-4xl">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  {section.title}
                </h2>
                <div
                  className="text-white prose-lg mx-auto"
                  dangerouslySetInnerHTML={markdownify(section.content)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutMePerson;
