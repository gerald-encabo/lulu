"use client";
import { useEffect, useState } from "react";
import { defineQuery } from "next-sanity";
import { HomeTabbar } from "./HomeTabbar";
import { productType } from "@/constants";
import { client } from "@/sanity/lib/client";
import { Product } from "@/sanity.types";
import { NoProductAvailable } from "./NoProductAvailable";
import { motion, AnimatePresence } from "motion/react";
import { Loader2 } from "lucide-react";
import { ProductCard } from "./ProductCard";

const PRODUCTS_BY_VARIANT_QUERY = defineQuery(
  `*[_type == "product" && variant == $productVariant] | order(name asc)`,
);

export const ProductGrid = () => {
  const [selectedTab, setSelectedTab] = useState(productType[0]?.title || "");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await client.fetch(PRODUCTS_BY_VARIANT_QUERY, {
          productVariant: selectedTab.toLowerCase(),
        });
        setProducts(response);
      } catch (error) {
        console.log("Product fetching error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedTab]);

  return (
    <div className="mt-10 flex flex-col items-center">
      <HomeTabbar selectedTab={selectedTab} onTableSelect={setSelectedTab} />
      {loading ? (
        <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full mt-10">
          <motion.div className="flex items-center space-x-2 text-blue-600">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-xl font-semibold">
              Product is loading....
            </span>
          </motion.div>
        </div>
      ) : (
        <>
          {products?.length ? (
            <div className="grid grid-col-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10 w-full">
              {products?.map((product: Product) => (
                <AnimatePresence key={product._id}>
                  <motion.div
                    layout
                    initial={{ opacity: 0.2 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                </AnimatePresence>
              ))}
            </div>
          ) : (
            <NoProductAvailable selectedTab={selectedTab} />
          )}
        </>
      )}
    </div>
  );
};
