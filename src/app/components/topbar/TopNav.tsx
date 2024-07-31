"use client";

import {
  SignedOut,
  UserButton,
  SignedIn,
  SignInButton,
  useAuth,
} from "@clerk/nextjs";
// import { SimpleUploadButton } from "./simpleUploadButton";
import Link from "next/link";
import { Logo } from "~/app/icons/Logo";
import LangSelect from "~/app/components/topbar/LangSelect";
import Search from "~/app/components/topbar/Search";
import { usePathname } from "next/navigation";

export function TopNav() {
  const pathname = usePathname();
  const isOnFullViewPage = pathname.includes(`/img/`);
  const { isSignedIn } = useAuth();

  return (
    <nav className="flex w-full items-center justify-between border-b p-3 text-xl font-semibold">
      <Link href="/">
        <div className="flex h-full items-center justify-center space-x-1">
          <div className="flex h-[26px] items-center justify-center pb-1 text-center">
            Gallery
          </div>
          <Logo />
        </div>
      </Link>

      {!isOnFullViewPage && isSignedIn && (
        <div className="flex items-center justify-between gap-2">
          <Search />
        </div>
      )}

      <div className="flex flex-row items-center gap-4">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          {/* <SimpleUploadButton /> */}
          <LangSelect />
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
