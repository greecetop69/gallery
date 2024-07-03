import { clerkClient } from "@clerk/nextjs/server";
import { getImage } from "~/server/queries";

export default async function FullPageImageView(props: { id: number }) {
  const image = await getImage(props.id);

  const uploaderInfo = await clerkClient.users.getUser(image.userId);

  return (
    <div className="flex h-full w-full min-w-0 items-center justify-center">
      <div className="flex justify-items-start">
        <img
          src={image.url}
          alt={image.name}
          className="object-contain"
        />
        <div className="bg-black bg-opacity-50 text-white p-2 text-left ml-4">
          <div className="text-lg">{image.name}</div>
          <div>Created on: {new Date(image.createdAt).toLocaleDateString()}</div>
          <div>Uploaded by: {uploaderInfo.username}</div>
        </div>
      </div>
    </div>
  );
}
