import { clerkClient } from "@clerk/nextjs/server";
import { getImage } from "~/server/queries";

export default async function FullPageImageView(props: { id: number }) {
  const image = await getImage(props.id);

  const uploaderInfo = await clerkClient.users.getUser(image.userId);

  return (
    <div className="flex h-full w-full min-w-0 items-center justify-center">
      <div className="flex justify-items-start  rounded">
        <img
          src={image.url}
          alt={image.name}
          className="object-contain"
        />
      <div className="relative text-white p-2 text-left pl-4 rounded-r-lg">
  <div className="absolute inset-0 bg-zinc-700 opacity-75 rounded-r-lg"></div>
  <div className="relative z-10 text-lg">{image.name}</div>
  <div className="relative z-10">Created on: {new Date(image.createdAt).toLocaleDateString()}</div>
  <div className="relative z-10">Uploaded by: {uploaderInfo.username}</div>
</div>
      </div>
    </div>
  );
}
