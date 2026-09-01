"use client";
import Loading from "@/components/Loading";
import userCartStore from "@/store";
import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { Container } from "@/components/Container";
import NoAccessToCart from "@/components/NoAccessToCart";
import EmptyCart from "@/components/EmptyCart";
import { Heart, ShoppingBag, Trash, Trash2 } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import toast from "react-hot-toast";
import { PriceFormatter } from "@/components/PriceFormatter";
import { QuantityButtons } from "@/components/QuantityButtons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import paypal from "@/images/paypalLogo.png";
import {
  createCheckoutSession,
  Metadata,
} from "@/actions/createCheckoutSession";

const Cart = () => {
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isSignedIn } = useAuth();
  const {
    deleteCartProduct,
    getTotalPrice,
    getItemCount,
    getSubTotalPrice,
    resetCart,
    getGroupedItems,
  } = userCartStore();

  const { user } = useUser();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Loading />;
  }

  const cartProducts = getGroupedItems();

  const handleDeleteProduct = (id: string) => {
    deleteCartProduct(id);
    toast.success("Product deleted successfully!");
  };

  const handleResetCart = () => {
    const confirmed = window.confirm("Are you sure to reset you cart?");
    if (confirmed) {
      resetCart();
      toast.success("Your cart reset successfully");
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Unknown",
        customerEmail: user?.emailAddresses[0]?.emailAddress ?? "Unknown",
        clerkUserId: user!.id,
      };
      const checkoutUrl = await createCheckoutSession(cartProducts, metadata);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.log("Error creating checkout session: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 pb-6 md:pb-10">
      {isSignedIn ? (
        <Container>
          {cartProducts?.length ? (
            <>
              <div className="flex items-center gap-2 py-5">
                <ShoppingBag />
                <h1 className="text-2xl font-semibold">Shopping Cart</h1>
              </div>
              <div className="grid lg:grid-cols-3 md:gap-8">
                {/*  Product List */}
                <div className="lg:col-span-2 rounded-lg">
                  <div className="border bg-white rounded-md">
                    {cartProducts?.map(({ product }) => {
                      const itemCount = getItemCount(product?._id);
                      return (
                        <div
                          key={product?._id}
                          className="border-b p-2.5 last:border-b-0 flex items-center justify-between gap-5"
                        >
                          <div className="flex flex-1 items-center gap-2 h-auto md:h-44">
                            {product?.images && (
                              <Link
                                href={`/product/${product?.slug?.current}`}
                                className="border p-0.5 md:p-1 mr-2 rounded-md overflow-hidden group"
                              >
                                <Image
                                  src={urlFor(product?.images[0]).url()}
                                  alt="productImage"
                                  width={500}
                                  height={500}
                                  loading="lazy"
                                  className="w-32 md:w-40 h-32 md:h-40 object-cover group-hover:scale-105 overflow-hidden hoverEffect"
                                />
                              </Link>
                            )}
                            <div className="h-full flex flex-1 items-start flex-col justify-between py-1">
                              <div className="space-y-1.5">
                                <h2 className="font-semibold line-clamp-1">
                                  {product?.name}
                                </h2>
                                <p className="text-sm text-lightColor font-medium">
                                  {product?.intro}
                                </p>
                                <p className="text-sm capitalize">
                                  Variant:{" "}
                                  <span className="font-semibold">
                                    {product?.variant}
                                  </span>
                                </p>
                                <p className="text-sm capitalize">
                                  Status:{" "}
                                  <span className="font-semibold">
                                    {product?.status}
                                  </span>
                                </p>
                              </div>
                              <div className="text-gray-500 flex items-center gap-2">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Heart className="h-4 w-4 md:w-5 md:h-5 hover:text-green-600 hoverEffect" />
                                      <TooltipContent className="font-bold">
                                        Add to Favorite
                                      </TooltipContent>
                                    </TooltipTrigger>
                                  </Tooltip>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Trash
                                        className="h-4 w-4 md:w-5 md:h-5 hover:text-red-600 hoverEffect"
                                        onClick={() => {
                                          handleDeleteProduct(product?._id);
                                        }}
                                      />
                                      <TooltipContent className="font-bold bg-red-600">
                                        Delete Product
                                      </TooltipContent>
                                    </TooltipTrigger>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </div>
                            <div className="flex flex-col items-start justify-between h-36 md:h-44 p-0.5 md:p-1 ">
                              <PriceFormatter
                                amount={(product?.price as number) * itemCount}
                                className="font-bold text-lg"
                              />
                              <QuantityButtons product={product} />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div className="flex items-left justify-items-end">
                      <Button
                        className="m-5 font-semibold"
                        onClick={handleResetCart}
                      >
                        <Trash2 />
                        Clear Cart
                      </Button>
                    </div>
                  </div>
                </div>
                {/* Order Summary for desktop view */}
                <div className="lg:col-span-1">
                  <div className="hidden md:inline-block w-full bg-white p-6 rounded-lg border">
                    <h2 className="text-xl font-semibold">Order Summary</h2>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <PriceFormatter amount={getSubTotalPrice()} />
                      </div>
                      <div className="flex justify-between">
                        <span>Discount</span>
                        <PriceFormatter
                          amount={getSubTotalPrice() - getTotalPrice()}
                        />
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span>Total</span>
                        <PriceFormatter
                          amount={getTotalPrice()}
                          className="text-lg font-bold text-black"
                        />
                      </div>
                      <Button
                        className="w-full rounded-full font-semibold tracking-wide bg-stripeBtn hover:bg-stripeBtn/80"
                        size="lg"
                        onClick={handleCheckout}
                      >
                        Checkout with{" "}
                        <span className="font-extrabold text-lg tracking-tight">
                          Stripe
                        </span>
                      </Button>
                      <Link
                        href={"#"}
                        className="flex items-center justify-center py-2 border border-darkColor/50 rounded-full hover:border-darkColor hover:bg-darkColor/5 hoverEffect"
                      >
                        <Image
                          src={paypal}
                          alt="paypalLogo"
                          className="w-15"
                          loading="lazy"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
                {/* Order summary for mobile view */}
                <div className="md:hidden w-full bg-white pt-6">
                  <div className="p-4 rounded-lg border">
                    <h2 className="text-xl font-semibold">Order Summary</h2>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <PriceFormatter amount={getSubTotalPrice()} />
                      </div>
                      <div className="flex justify-between">
                        <span>Discount</span>
                        <PriceFormatter
                          amount={getSubTotalPrice() - getTotalPrice()}
                        />
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span>Total</span>
                        <PriceFormatter
                          amount={getTotalPrice()}
                          className="text-lg font-bold text-black"
                        />
                      </div>
                      <Button
                        className="w-full rounded-full font-semibold tracking-wide bg-stripeBtn hover:bg-stripeBtn/80"
                        size="lg"
                        onClick={handleCheckout}
                      >
                        Checkout with{" "}
                        <span className="font-extrabold text-lg tracking-tight">
                          Stripe
                        </span>
                      </Button>
                      <Link
                        href={"#"}
                        className="flex items-center justify-center py-2 border border-darkColor/50 rounded-full hover:border-darkColor hover:bg-darkColor/5 hoverEffect"
                      >
                        <Image
                          src={paypal}
                          alt="paypalLogo"
                          className="w-15"
                          loading="lazy"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <EmptyCart />
          )}
        </Container>
      ) : (
        <NoAccessToCart />
      )}
    </div>
  );
};

export default Cart;
