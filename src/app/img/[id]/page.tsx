import FullPageImageView from "~/app/components/FullPageImageView";

export default function PhotoPage({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idAsNumber = Number(photoId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo ID");

  return (
  <div className="h-full">
  <FullPageImageView id={idAsNumber} />
  </div>
  )
}
