"use client";

import { SignedOut, UserButton, SignedIn, SignInButton } from "@clerk/nextjs";
import { SimpleUploadButton } from "./simpleUploadButton";
import Link from "next/link";
import { Logo } from "~/app/components/Logo";
import LangSelect from "~/app/components/LangSelect";

export function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <Link href="/">
        <div className="flex h-full items-center justify-center space-x-1">
          <div className="flex h-[26px] items-center justify-center pb-1 text-center">
            Gallery
          </div>
          <Logo />
        </div>
      </Link>

      <div className="flex flex-row gap-4 items-center">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
            <SimpleUploadButton />
          <LangSelect />
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
