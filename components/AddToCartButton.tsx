"use client";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Product } from "@/sanity.types";
import { QuantityButtons } from "./QuantityButtons";
import { PriceFormatter } from "./PriceFormatter";
import userCartStore from "@/store";
import toast from "react-hot-toast";

interface Props {
  product: Product;
  className?: string;
}

export const AddToCartButton = ({ product, className }: Props) => {
  const { addItem, getItemCount } = userCartStore();
  const itemCount = getItemCount(product._id);
  const isOutOfStock = product?.stock === 0;

  return (
    <div className="w-full h-12 flex items-center">
      {itemCount ? (
        <div className="w-full text-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Quantity</span>
            <QuantityButtons product={product} />
          </div>
          <div className="flex items-center justify-between border-t p-1">
            <span className="text-xs font-semibold">Subtotal</span>
            <PriceFormatter
              amount={product?.price ? product?.price * itemCount : 0}
            />
          </div>
        </div>
      ) : (
        <Button
          disabled={isOutOfStock}
          onClick={() => {
            addItem(product);
            toast.success(
              `${product?.name?.substring(0, 12)}... added successfully!`,
            );
          }}
          className={cn(
            "md:w-full w-auto bg-transparent text-darkColor shadow-none border-darkColor/30 font-semibold tracking-wide hover:text-white hoverEffect rounded-md",
            className,
          )}
        >
          Add to cart
        </Button>
      )}
    </div>
  );
};
