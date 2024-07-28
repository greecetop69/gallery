"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import type { IImage } from "~/server/queries";
import FullPageImageView from "./FullPageImageView";

export const AllImages = ({ images }: { images: IImage[] }) => {
  const [selectedImage, setSelectedImage] = useState<IImage>();
  return (
    <Dialog >
      {images.map((image) => (
        <DialogTrigger
          onClick={() => {
            setSelectedImage(image);
          }}
          key={image.id}
          className="flex w-48 flex-col"
        >
          <Image
            src={image.url}
            style={{ objectFit: "contain" }}
            width={192}
            height={192}
            alt={image.name}
          />
          <div>{image.name}</div>
        </DialogTrigger>
      ))}
      <DialogContent>   
        {selectedImage && (
          <FullPageImageView image={selectedImage} />
        )}
      </DialogContent>
    </Dialog>
  );
};
