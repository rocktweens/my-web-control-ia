export const dynamic = "force-dynamic";

import CollectionsSlider from "@/components/CollectionsSlider";
import HeroSlider from "@/components/HeroSlider";
import SkeletonCategory from "@/components/loadings/skeleton/SkeletonCategory";
import SkeletonFeaturedProducts from "@/components/loadings/skeleton/SkeletonFeaturedProducts";
import config from "@/config/config.json";
import { getListPage } from "@/lib/contentParser";
import {
  getCollectionProducts,
  getCollections,
  getCollectionServices,
} from "@/lib/strapi";
import CallToAction from "@/partials/CallToAction";
import FeaturedProducts from "@/partials/FeaturedProducts";
import FeaturedServices from "@/partials/FeaturedServices";
import SeoMeta from "@/partials/SeoMeta";
import { Suspense } from "react";
import Contact from "@/components/contact";
import MePerson from "@/components/aboutme";
import Company from "@/components/company";
import WhatsappFloatingButton from "@/components/WhatsappFloatingButton";

import { RegularPage } from "@/types";

const { collections } = config.strapi;

const ShowHeroSlider = async () => {
  const sliderImages = await getCollectionProducts({
    collection: collections.hero_slider,
  });
  const { products } = sliderImages;
  return <HeroSlider products={products} />;
};

const ShowCollections = async () => {
  const collections = await getCollections();
  return <CollectionsSlider collections={collections} />;
};

/* const ShowFeaturedProducts = async () => {
  const { pageInfo, products } = await getCollectionProducts({
    collection: collections.featured_products,
    reverse: false,
  });
  return <FeaturedServices products={products} />;
}; */

const ShowFeaturedServices = async () => {
  const { pageInfo, services } = await getCollectionServices({
    collection: collections.featured_products,
    reverse: false,
  });
  return <FeaturedServices services={services} />;
};

const Home = () => {
  const callToAction = getListPage("sections/call-to-action.md");
  const data: RegularPage = getListPage("/home/_index.md");
  const { frontmatter } = data;
  const { about_me, about_section_enable, about_section_title, abouts } =
    frontmatter;

  return (
    <>
      <SeoMeta />
      <section>
        <div className="container-third">
          <div className="bg-tertiary py-10 rounded-md">
            <Suspense>
              <ShowHeroSlider />
            </Suspense>
          </div>
        </div>
      </section>

      {/* category section  */}
{/*       <section className="section">
        <div className="container">
          <div className="text-center mb-6 md:mb-14">
            <h2>Collections</h2>
          </div>
          <Suspense fallback={<SkeletonCategory />}>
            <ShowCollections />
          </Suspense>
        </div>
      </section> */}

      {/* Featured Products section  */}
      {/*  <section>
        <div className="container">
          <div className="text-center mb-6 md:mb-14">
            <h2 className="mb-2">Featured Products</h2>
            <p className="md:h5">Explore Today's Featured Picks!</p>
          </div>
          <Suspense fallback={<SkeletonFeaturedProducts />}>
            <ShowFeaturedProducts />
          </Suspense>
        </div>
      </section> */}

      {/* Featured Services section  */}
      <section id="seccion-servicios">
        <div className="container">
          <div className="text-center mb-6 md:mb-14 py-8">
            <h2 className="mb-2">Servicios de Alto Impacto</h2>
            <p className="md:h5">Conoce todos nuestros servicios</p>
          </div>
          <Suspense fallback={<SkeletonFeaturedProducts />}>
            <ShowFeaturedServices />
          </Suspense>
        </div>
      </section>

      {/* About Me section  */}
      {about_section_enable && (
        <section id="sobre-mi" className="section">
          <div className="container-third py-8">
            {/* <div className="text-center mb-6 md:mb-14">
              <h2 className="mb-2">Sobre Mí</h2>
            </div> */}
            <MePerson abouts={about_me!} />
          </div>
        </section>
      )}

      {/* About Company section  */}
      <section className="section">
        <div className="container">
          <Company title={about_section_title!} abouts={abouts!} />
        </div>
      </section>

      {/* contact section  */}
      <section className="section">
        <div className="container-third">
          <Contact />
        </div>
      </section>

      {/* <CallToAction data={callToAction} /> */}
      {/* Chatea con ia  */}
      <WhatsappFloatingButton />
    </>
  );
};

export default Home;
