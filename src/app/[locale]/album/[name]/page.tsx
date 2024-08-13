import { getAlbumByName } from '~/server/queries';

export default async function AlbumPage({
  params: { name: albumName },
}: {
  params: { name: string };
}) {
  if (!albumName) throw new Error("Invalid album name");

  const album = (await getAlbumByName(albumName))

  return (
    <div>
      <h1>Album Name: {album.name}</h1>
    </div>
  );
}
