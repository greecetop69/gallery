"use client";
import { usePathname } from "next/navigation";
import type { IImage } from "~/server/queries";
import FormDelete from "./FormDelete";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "~/components/ui/button";

export default function ModalContent({
  image,
  closeDialog,
}: {
  image: IImage;
  closeDialog?: () => void;
}) {
  const t = useTranslations("HomePage");

  const pathname = usePathname();
  const isOnFullViewPage = pathname.includes(`/img/${image.id}`);

  return (
    <div className="mt-8 flex items-start justify-center gap-4">
      <div className="max-h-[70vh] max-w-full">
        <img
          src={image.url}
          alt={image.name}
          className="max-h-[70vh] max-w-full object-contain"
        />
      </div>
      <div className="flex max-w-max flex-col items-start rounded-lg bg-white p-4 shadow-lg">
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
