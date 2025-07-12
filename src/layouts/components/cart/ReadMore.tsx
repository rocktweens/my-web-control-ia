"use client";

import { ServiceVariant } from "@/lib/strapi/types";
import { addItem } from "@/lib/utils/cartActions";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { BiLoaderAlt } from "react-icons/bi";

function SubmitButton({
  stylesClass,
  handle,
}: {
  stylesClass: string;
  handle: string | null;
}) {
  const { pending } = useFormStatus();
  const buttonClasses = stylesClass;
  const disabledClasses = "cursor-not-allowed flex";

  const DynamicTag = handle === null ? "button" : Link;

    return (
      <DynamicTag
        href={`/services/${handle}`}
        aria-label="Please select an option"
        aria-disabled
        className={`${buttonClasses} ${
          DynamicTag === "button" && disabledClasses
        }`}
      >
        Leer Mas
      </DynamicTag>
    );



}

export function ReadMore({
  stylesClass,
  handle
}: {
  stylesClass: string;
  handle: string | null;
}) {
  const [message, formAction] = useActionState(addItem, null);
  const searchParams = useSearchParams();

  // Find the variant based on selected options
  const selectedOptions = Array.from(searchParams.entries());
 /*  const variant = variants.find((variant: ServiceVariant) =>
    selectedOptions.every(([key, value]) =>
      variant.selectedOptions.some(
        (option) => option.name.toLowerCase() === key && option.value === value,
      ),
    ),
  ); */

  // Use the default variant ID if no variant is found
  // const selectedVariantId = variant?.id || defaultVariantId;

  // const actionWithVariant = formAction.bind(null, selectedVariantId);

  return (
    <form>
      {/* action={actionWithVariant}> */}
      <SubmitButton
        stylesClass={stylesClass}
        handle={handle}
      />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
