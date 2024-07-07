import { clerkClient } from "@clerk/nextjs/server";
import { Button } from "~/components/ui/button";
import { deleteImage, getImage } from "~/server/queries";
import FormDelete from "./FormDelete";

export default async function FullPageImageView(props: { id: number }) {
  const image = await getImage(props.id);

  const uploaderInfo = await clerkClient.users.getUser(image.userId);

  return (
    <div className="flex h-full w-full min-w-0 items-center justify-center">
      <div className="flex justify-items-start">
        <img src={image.url} alt={image.name} className="object-contain" />
        <div className="ml-4 bg-black bg-opacity-50 p-2 text-left text-white">
          <div className="text-lg">{image.name}</div>
          <div>
            Created on: {new Date(image.createdAt).toLocaleDateString()}
          </div>
          <div>Uploaded by: {uploaderInfo.username}</div>
        </div>

        <div className="p-2">
          <FormDelete imageId={props.id} />
        </div>
      </div>
    </div>
  );
}
