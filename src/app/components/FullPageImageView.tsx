"use client";
import { useEffect, useState } from "react";
import type { IImage } from "~/server/queries";
import FormDelete from "./FormDelete";
import Link from "next/link";
import { clerkClient } from "@clerk/nextjs/server";
import { useTranslations } from "next-intl";

type User = {
  username: string;
};

export default function FullPageImageView({ image }: { image: IImage }) {
  const [uploaderInfo, setUploaderInfo] = useState<User | null>(null);
  const t = useTranslations("HomePage");

  useEffect(() => {
    async function fetchUploaderInfo() {
      try {
        const user = await clerkClient.users.getUser(image.userId);
        setUploaderInfo(user as User);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    }

    void fetchUploaderInfo();
  }, [image.userId]);

  console.log("CLERK_SECRET_KEY", process.env.CLERK_SECRET_KEY);
  console.log(
    "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  );

  return (
    <div className="flex h-full w-full min-w-0 items-center justify-center pt-24">
      <div className="flex max-w-screen-xl justify-items-start">
        <img
          src={image.url}
          alt={image.name}
          className="max-h-[700px] max-w-full object-contain"
        />
        <div className="relative w-1/3 rounded-r-lg p-2 pl-4 text-left text-white">
          <div className="absolute inset-0 rounded-r-lg bg-zinc-700 opacity-75"></div>
          <div className="relative z-10 text-lg">{image.name}</div>
          <div className="relative z-10">
            {t("created_on")}: {new Date(image.createdAt).toLocaleDateString()}
          </div>
          <div className="relative z-10">
            {t("uploaded_by")}:{" "}
            {uploaderInfo ? uploaderInfo.username : "Loading..."}
          </div>
          <div className="relative z-20 mt-4">
            <FormDelete imageId={image.id} />
          </div>
          <div className="relative z-20 mt-4">
            <Link href={`/img/${image.id}`}>фулл вью</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
