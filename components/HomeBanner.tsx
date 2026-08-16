import React from "react";
import { Title } from "./Title";

export const HomeBanner = () => {
  return (
    <div className="flex flex-col items-center gap-5 justify-center">
      <Title className="text-3xl md:text-4xl uppercase font-bold text-center">
        Best Clothing Collection
      </Title>
      <p className="text-sm text-center text-lightColor/80 font-medium max-w-120">
        Find everything you need to look and feel your best, and shop the latest
        men&apos;s fashion and lifestyle products
      </p>
    </div>
  );
};
