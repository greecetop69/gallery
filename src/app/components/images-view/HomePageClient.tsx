"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { AllImages } from "./AllImages";
import type { IImage } from "~/server/queries";

type User = {
  userId: string;
};

interface HomePageClientProps {
  images: IImage[];
  user: User;
  pageCount: number;
}

export function HomePageClient({
  images,
  user,
  pageCount,
}: HomePageClientProps) {
  const t = useTranslations("HomePage");
  const searchParams = useSearchParams();
  const query = searchParams.get("query") ?? "";

  if (!user.userId) {
    return (
      <div className="flex items-center justify-center">
        <span className="text-bold text-2xl">{t("no_auth")}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">test</div>
      </SignedOut>
      <SignedIn>
        <AllImages images={images} query={query} pageCount={pageCount} />
      </SignedIn>
    </div>
  );
}
