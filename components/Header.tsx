import { HeaderMenu } from "./HeaderMenu";
import { Logo } from "./Logo";
import { Container } from "./Container";
import { MobileMenu } from "./MobileMenu";
import { SearchBar } from "./SearchBar";
import { CartIcon } from "./CartIcon";
import { currentUser } from "@clerk/nextjs/server";
import { ClerkLoaded, Show, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ListOrdered } from "lucide-react";

export const Header = async () => {
  const user = await currentUser();

  return (
    <header className="bg-white border-b border-b-gray-400 py-5 w-full fixed z-50">
      <Container className="flex items-center justify-between gap-7 text-light">
        <HeaderMenu />
        <div className="w-auto md:w-1/3 flex items-center justify-center gap-2.5">
          <MobileMenu />
          <Logo>LuLu</Logo>
        </div>
        <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
          <SearchBar />
          <CartIcon />
          <ClerkLoaded>
            <Show when="signed-in">
              <Link href={"/orders"} className="group relative">
                <ListOrdered className="w-5 h-5 group-hover:text-darkColor hoverEffect" />
                <span className="absolute -top-1 -right-1 bg-darkColor text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
                  0
                </span>
              </Link>
              <UserButton />
            </Show>
            {!user && (
              <SignInButton mode="modal">
                <button className="text-sm font-semibold hover:text-darkColor hoverEffect">
                  Login
                </button>
              </SignInButton>
            )}
          </ClerkLoaded>
        </div>
      </Container>
    </header>
  );
};
