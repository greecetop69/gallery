"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { IImage } from "~/server/queries";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import ModalContent from "./ModalContent";
import { useTranslations } from "next-intl";
import { SimpleUploadDragAndDrop } from "~/_components/UploadDropzone";

type AllImagesProps = {
  images: IImage[];
  query: string;
};

export function AllImages({ images, query }: AllImagesProps) {
  const [filteredImages, setFilteredImages] = useState<IImage[]>(images);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<IImage | null>(null);
  const t = useTranslations("HomePage");

  useEffect(() => {
    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      setFilteredImages(
        images.filter((image) =>
          image.name.toLowerCase().includes(lowerCaseQuery),
        ),
      );
    } else {
      setFilteredImages(images);
    }
  }, [query, images]);

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-4 p-4">
        {filteredImages.length > 0 ? (
          filteredImages.map((image) => (
            <Dialog
              key={image.id}
              open={isDialogOpen}
              onOpenChange={setIsDialogOpen}
            >
              <DialogTrigger
                onClick={() => {
                  setSelectedImage(image);
                  setIsDialogOpen(true);
                }}
                className="relative h-48 w-48"
              >
                <Image
                  src={image.url}
                  style={{ objectFit: "cover" }}
                  layout="fill"
                  alt={image.name}
                />
                <div className="absolute bottom-0 w-full bg-black/80 bg-opacity-50 text-center text-white">
                  {image.name}
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl overflow-y-auto rounded-lg p-4 shadow-lg">
                {selectedImage && (
                  <div>
                    <ModalContent
                      image={selectedImage}
                      closeDialog={closeDialog}
                    />
                  </div>
                )}
              </DialogContent>
            </Dialog>
          ))
        ) : (
          <div>{t("no_images_found")}</div>
        )}
        <SimpleUploadDragAndDrop />
      </div>
    </div>
  );
}
