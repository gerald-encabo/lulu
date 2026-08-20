import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Product } from "@/sanity.types";

interface Props {
  product?: Product;
  className?: string;
}

export const AddToCartButton = ({ product, className }: Props) => {
  const isOutOfStock = product?.stock === 0;

  return (
    <div>
      <Button
        disabled={isOutOfStock}
        className={cn(
          "w-full bg-transparent text-darkColor shadow-none border-darkColor/30 font-semibold tracking-wide hover:text-white hoverEffect",
          className,
        )}
      >
        Add to cart
      </Button>
    </div>
  );
};
