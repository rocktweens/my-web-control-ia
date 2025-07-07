import ImageFallback from "@/helpers/ImageFallback";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { ServicioItem, RegularPage } from "@/types";
import { FaBoxOpen, FaCheckCircle, FaHeadset } from "react-icons/fa";

const ServiceSingle = async (props: { params: Promise<{ slug: string }> }) => {
  const params = await props.params;

  // return <div>{JSON.stringify(params)}</div>;

  const data: RegularPage = getListPage(`services/${params.slug}.md`);

  const { frontmatter } = data;
  const { title, servicio } = frontmatter;

  return (
    <>
      <section>
        <div className="container">
          {servicio?.map((section: ServicioItem, index: number) => (
            <div
              className={`lg:flex gap-8 mt-14 lg:mt-28`}
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

      <section className="section">
        <div className="container">
          <div className="bg-light px-7 py-20 dark:bg-darkmode-light text-center rounded-md">
            <h2>Razones para elegirnos</h2>

            <div className="row justify-center gap-6 mt-14">
              <div className="col-6 md:col-5 lg:col-3">
                <div className="flex justify-center">
                  <FaHeadset size={48} />
                </div>
                <h3 className="md:h4 mt-6 mb-4">24/7 Soporte Amigable</h3>
                <p>Nuestro equipo de soporte siempre está listo para usted los 7 días de la semana</p>
              </div>

              <div className="col-6 md:col-5 lg:col-3">
                <div className="flex justify-center">
                  <FaBoxOpen size={48} />
                </div>
                <h3 className="md:h4 mt-6 mb-4">Devolución fácil en 7 días</h3>
                <p>
                 Cualquier falla del producto dentro de los 7 días para un cambio inmediato.
                </p>
              </div>

              <div className="col-6 md:col-5 lg:col-3">
                <div className="flex justify-center">
                  <FaCheckCircle size={48} />
                </div>
                <h3 className="md:h4 mt-6 mb-4">Calidad Garantizada</h3>
                <p>
                  Si su producto no está perfecto, devuélvalo para obtener un reembolso completo
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceSingle;
