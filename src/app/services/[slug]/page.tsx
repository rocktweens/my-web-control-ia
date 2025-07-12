import ImageFallback from "@/helpers/ImageFallback";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { ServicioItem, RegularPage } from "@/types";
import { FaBoxOpen, FaCheckCircle, FaHeadset } from "react-icons/fa";
import Support from "@/components/support";

const ServiceSingle = async (props: { params: Promise<{ slug: string }> }) => {
  const params = await props.params;

  // return <div>{JSON.stringify(params)}</div>;

  const data: RegularPage = getListPage(`services/${params.slug}.md`);

  const { frontmatter } = data;
  const { title, servicio } = frontmatter;

  return (
    <>
      <section className="bg-gray-200 py-5">
        <div className="container">
          {servicio?.map((section: ServicioItem, index: number) => (
            <div
              className={`lg:flex gap-8 mt-14 lg:mt-25`}
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
      </section>

      {/* <Support /> */}
    </>
  );
};

export default ServiceSingle;
