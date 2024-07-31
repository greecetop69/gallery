import FullPageImageView from "~/app/components/images-view/FullPageImageView";

import { getImage, type IImage } from "~/server/queries";

export default async function PhotoPage({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idAsNumber = Number(photoId);

  if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo ID");

  const image = (await getImage(idAsNumber)) as IImage;

  return (
    <div className="m-0 flex h-full items-center justify-center">
      <FullPageImageView image={image} />
    </div>
  );
}
