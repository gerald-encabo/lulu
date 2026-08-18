import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LuLu Clothing E-commerce Backend",
  description: "An E-commerce backend",
};

const StudioLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default StudioLayout;
