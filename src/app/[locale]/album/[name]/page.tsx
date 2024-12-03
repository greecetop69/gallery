import { AlbumImages } from '~/app/components/album/AlbumImages';
import { getAlbumByName, getAlbumImages, type IImage } from '~/server/queries';

export default async function AlbumPage({
  params: { name: albumName },
}: {
  params: { name: string };
}) {
  if (!albumName) throw new Error("Invalid album name");

  const album = await getAlbumByName(albumName);
  const albumImagesRaw = await getAlbumImages(album.id);

  const albumImages: IImage[] = albumImagesRaw.map(img => ({
    id: img.id,
    name: img.name,
    url: img.url,
    userId: img.userId ?? null,
    createdAt: img.createdAt || new Date(),
    updatedAt: img.updatedAt ?? null,
  }));

  const query = "";
  const pageCount = 1;
  const total = albumImages.length;

  return (
    <div>
      <h1>Album Name: {album.name}</h1>
      <AlbumImages
        images={albumImages}
        query={query}
        pageCount={pageCount}
        total={total}
      />
    </div>
  );
}