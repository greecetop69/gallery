import { useEffect, useState } from "react";
import Image from "next/legacy/image";
import type { IImage } from "~/server/queries";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import ModalContent from "./ModalContent";
import { useTranslations } from "next-intl";
import { SimpleUploadDragAndDrop } from "~/app/components/upload/UploadDropzone";
import { PaginationComponent } from "./PaginationComponent";
import { useRouter, useSearchParams } from "next/navigation";
import AlbumsPage1 from "../album/AlbumsPage";

type AllImagesProps = {
  images: IImage[];
  query: string;
  pageCount: number;
  total: number;
};

export function AllImages({ images, query, pageCount, total }: AllImagesProps) {
  const [filteredImages, setFilteredImages] = useState<IImage[]>(images);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<IImage | null>(null);
  const router = useRouter();
  const t = useTranslations("MainPage");
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") ?? "1", 10);

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

  useEffect(() => {
    if (filteredImages.length === 0) {
      router.back();
    }
  }, [filteredImages, router]);

  const imagesPerPage = 11;
  const isPaginationDisabled = total <= imagesPerPage * (currentPage - 1);

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <AlbumsPage1/>
      
      <div className="grid grid-cols-6 gap-4 p-4">
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
                  layout="fill"
                  objectFit="cover"
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
      <PaginationComponent
        pageCount={pageCount}
        isDisabled={isPaginationDisabled}
      />
    </div>
  );
}
