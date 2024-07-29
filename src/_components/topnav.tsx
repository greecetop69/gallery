"use client";

import { SignedOut, UserButton, SignedIn, SignInButton } from "@clerk/nextjs";
import { SimpleUploadButton } from "./simpleUploadButton";
import Link from "next/link";
import { Logo } from "~/app/components/Logo";

export function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <Link href="/">
        <div className="flex h-full items-center justify-center space-x-1">
          <div className="flex items-center justify-center text-center h-[26px] pb-1">
            Gallery
          </div>
          <Logo />
        </div>
      </Link>
      <div className="flex flex-row">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <div className="mr-4">
            <SimpleUploadButton />
          </div>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
