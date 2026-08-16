import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const Logo = ({ children, className }: Props) => {
  return (
    <Link href={"/"}>
      <h2
        className={cn(
          "text-2xl text-darkColor font-black tracking-wider",
          className,
        )}
      >
        {children}
      </h2>
    </Link>
  );
};
