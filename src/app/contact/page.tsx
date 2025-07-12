import config from "@/config/config.json";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { ContactUsItem, RegularPage } from "@/types";

import  Contacto from "@/components/contact/index";

const Contact = async () => {
  const data: RegularPage = getListPage("contact/_index.md");
  const { frontmatter } = data;
  const { title, description, meta_title, image, contact_meta } = frontmatter;
  const { contact_form_action } = config.params;

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <PageHeader title={title} />
      <section className="pt-12 xl:pt-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contact_meta &&
              contact_meta?.map((contact: ContactUsItem) => (
                <div
                  key={contact.name}
                  className="p-10 bg-light dark:bg-darkmode-light rounded-md text-center"
                >
                  <p
                    dangerouslySetInnerHTML={markdownify(contact.name)}
                    className="mb-6 h3 font-medium text-text-dark dark:text-darkmode-text-dark"
                  />
                  <p dangerouslySetInnerHTML={markdownify(contact.contact)} />
                </div>
              ))}
          </div>
        </div>
      </section>

      <Contacto/>

      </>
  );
};

export default Contact;
