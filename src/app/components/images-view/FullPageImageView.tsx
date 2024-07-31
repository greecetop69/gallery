"use client";
import { useEffect, useState } from "react";
import type { IImage } from "~/server/queries";
import FormDelete from "./FormDelete";
import { clerkClient } from "@clerk/nextjs/server";
import { useTranslations } from "next-intl";

type User = {
  username: string;
};

export default function FullPageImageView({
  image,
  closeDialog,
}: {
  image: IImage;
  closeDialog?: () => void;
}) {
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

  const createdAtDate = image.createdAt ? new Date(image.createdAt) : null;
  const createdAtString = createdAtDate
    ? createdAtDate.toLocaleDateString()
    : "N/A";

  return (
    <div className="flex h-full w-full min-w-0 items-center justify-center pt-16">
      <div className="flex max-w-screen-xl">
        <img
          src={image.url}
          alt={image.name}
          className="max-h-[80vh] max-w-[70vw] object-contain"
        />
        <div className="relative w-1/4 rounded-r-lg p-2 pl-4 text-left text-white">
          <div className="absolute inset-0 rounded-r-lg bg-zinc-700 opacity-75"></div>
          <div className="relative z-10 break-words text-lg">{image.name}</div>
          <div className="relative z-10">
            {t("created_on")}: {createdAtString}
          </div>
          <div className="relative z-10">
            {t("uploaded_by")}:
            {uploaderInfo ? uploaderInfo.username : "Loading..."}
          </div>
          <div className="relative z-20 mt-4">
            <FormDelete
              imageId={image.id}
              closeDialog={closeDialog ?? (() => {})}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
