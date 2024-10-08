"use client";
import { usePathname } from "next/navigation";
import type { IImage } from "~/server/queries";
import FormDelete from "./FormDelete";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "~/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { LoadingSpinnerIcon } from "~/app/icons/LoadingSpinnerIcon";

export default function ModalContent({
  image,
  closeDialog,
}: {
  image: IImage;
  closeDialog?: () => void;
}) {
  const t = useTranslations("MainPage");
  const { theme } = useTheme();
  const pathname = usePathname();
  const isOnFullViewPage = pathname.includes(`/img/${image.id}`);

  const [hydrated, setHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
  };

  if (!hydrated) {
    return null;
  }

  return (
    <div className="mt-8 flex items-start justify-center gap-4">
      <div className="relative max-h-[70vh] max-w-full">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <LoadingSpinnerIcon className="h-16 w-16" />
          </div>
        )}
        <img
          src={image.url}
          alt={image.name}
          className={`max-h-[70vh] max-w-full object-contain ${isLoading ? "opacity-0" : "opacity-100"}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>
        <div
          className={`flex max-w-max flex-col items-start rounded-lg ${theme === "dark" ? "bg-white" : "bg-slate-300"} p-4 shadow-lg`}
        >
          <div className="text-lg text-gray-900">{image.name}</div>
          <div className="mt-3">
            <FormDelete
              imageId={image.id}
              closeDialog={closeDialog ?? (() => {})}
            />
          </div>
          {!isOnFullViewPage && (
            <div className="mt-3">
              <Link href={`/img/${image.id}`} passHref>
                <Button variant="secondary" type="button">
                  {t("view_in_full")}
                </Button>
              </Link>
            </div>
          )}
        </div>
    </div>
  );
}
