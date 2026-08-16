import React from "react";
import { HeaderMenu } from "./HeaderMenu";
import { Logo } from "./Logo";
import { Container } from "./Container";

export const Header = () => {
  return (
    <header className="bg-white border-b border-b-gray-400 py-5">
      <Container className="flex items-center justify-between gap-7 text-light">
        <HeaderMenu />
        <div className="w-auto md:w-1/3 flex items-center">
          <Logo />
        </div>
        <div>right</div>
      </Container>
    </header>
  );
};
