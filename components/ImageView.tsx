"use client";
import { useState } from "react";
import {
  SanityImageAssetReference,
  SanityImageCrop,
  SanityImageHotspot,
} from "../sanity.types";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface Props {
  images?: Array<{
    asset?: SanityImageAssetReference;
    media?: unknown;
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
    _key: string;
  }>;
}

const ImageView = ({ images = [] }: Props) => {
  const [active, setActive] = useState(images[0]);

  return (
    <div className="w-full md:w-1/2 space-y-2 md:space-y-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={active?._key}
          className="w-full max-h-product-container-image-max-h min-h-product-container-image-min-h border border-darkColor/10 rounded-md group overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={urlFor(active).url()}
            alt="productImage"
            width={700}
            height={700}
            priority
            className="w-full h-96 max-h-product-image-h min-h-product-image-min-h object-contain group-hover:scale-110 hoverEffect rounded-md"
          />
        </motion.div>
      </AnimatePresence>
      <div className="grid grid-cols-6 gap-2 h-auto">
        {images?.map((image) => (
          <button
            key={image?._key}
            onClick={() => setActive(image)}
            className={`border rounded-md overflow-hidden ${active?._key === image?._key ? "ring-1 ring-darkColor" : ""}`}
          >
            <Image
              src={urlFor(image)?.url()}
              alt="productImage"
              width={100}
              height={100}
              className="w-full h-auto object-contain cursor-pointer"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageView;
