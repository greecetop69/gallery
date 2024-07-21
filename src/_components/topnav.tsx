"use client";

import { SignedOut, UserButton, SignedIn, SignInButton } from "@clerk/nextjs";
import { SimpleUploadButton } from "./simpleUploadButton";
import { useTranslations } from "next-intl";

export function TopNav() {
  const t = useTranslations("HomePage");

  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <div className="">{t("test")}</div>
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
