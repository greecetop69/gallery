"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import type { IImage } from "~/server/queries";
import ModalContent from "./ModalContent";

export const AllImages = ({ images }: { images: IImage[] }) => {
  const [selectedImage, setSelectedImage] = useState<IImage>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <div className="grid grid-cols-4 gap-4">
        {images.map((image) => (
          <DialogTrigger
            onClick={() => {
              setSelectedImage(image);
              setIsDialogOpen(true);
            }}
            key={image.id}
            className="relative h-48 w-48"
          >
            <Image
              src={image.url}
              style={{ objectFit: "cover" }}
              layout="fill"
              alt={image.name}
            />
            <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-center text-white">
              {image.name}
            </div>
          </DialogTrigger>
        ))}
      </div>
      <DialogContent className="max-w-4xl overflow-y-auto rounded-lg p-4 shadow-lg">
        {selectedImage && (
          <div>
            <ModalContent image={selectedImage} closeDialog={closeDialog} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
