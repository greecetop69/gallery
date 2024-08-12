import AlbumList from "~/app/components/album/AlbumList";
import { getAlbums, type IAlbum } from "~/server/queries";

export default async function AlbumsPage() {
  const albums = (await getAlbums()) as IAlbum[];

  return (
    <div className="m-0 flex h-full items-center justify-center">
      <AlbumList albums={albums} />
    </div>
  );
}
