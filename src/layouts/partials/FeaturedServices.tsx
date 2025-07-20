"use client";

import React from "react";
import { ReadMore } from "@/components/cart/ReadMore";
import config from "@/config/config.json";
import ImageFallback from "@/helpers/ImageFallback";
import { Service } from "@/lib/strapi/types";
import Link from "next/link";

const FeaturedServices = ({ services }: { services: Service[] }) => {
  const { pointSymbol } = config.strapi;

  return (
    <>
      <div className="row">
        {services.map((service: Service, index) => {
          const {
            id,
            title,
            handle,
            featuredImage,
            variants,
            details,
          } = service;

          // const defaultVariantId =
          //   variants?.length > 0 ? variants[0].id : undefined;
             //return <div>{JSON.stringify(service)}</div>;
          return (
            <div
              key={`serv${id}`}
              className="text-center col-6 md:col-4 lg:col-3 mb-8 md:mb-14 group relative"
            >
              <div className="relative overflow-hidden">
                <ImageFallback
                  src={featuredImage?.url || "/images/product_image404.jpg"}
                  width={312}
                  height={269}
                  alt={featuredImage?.altText || "fallback image"}
                  className="w-[312px] h-[150px] md:h-[269px] object-cover border border-border rounded-md"
                />

                <ReadMore
                  handle={handle}
                  stylesClass={
                    "btn btn-primary max-md:btn-sm z-10 absolute bottom-12 md:bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full md:group-hover:-translate-y-6 duration-300 ease-in-out whitespace-nowrap drop-shadow-md"
                  }
                />
              </div>
              <div className="py-2 md:py-4 text-center z-20">
                <h2 className="font-semibold text-base md:text-xl hover:font-bold hover:text-fifty">
                  <Link
                    className="after:absolute after:inset-0"
                    href={`/services/${handle}`}
                  >
                    {title}
                  </Link>
                </h2>
                <div className="flex flex-wrap  gap-x-2 mt-2 md:mt-4">
                  <ul className="text-left">
                    {details?.map((detail: string, index: number) => (
                      <li  key={`detail-${index}`}  className="inline-block">
                        <span className="text-base md:text-xl font-bold text-text-dark dark:text-darkmode-text-dark">
                          {pointSymbol}{" "}
                        </span>
                        {detail.length > 0 ? (
                          <span className="text-text-light dark:text-darkmode-text-light text-xs md:text-base font-medium">
                            {detail}{" "}
                          </span>
                        ) : (
                          ""
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

   {/*    <div className="flex justify-center">
        <Link
          className="btn btn-sm md:btn-lg btn-primary font-medium"
          href={"/services"}
        >
          + See All Services
        </Link>
      </div> */}
    </>
  );
};

export default FeaturedServices;
