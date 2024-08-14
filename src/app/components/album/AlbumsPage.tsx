"use client";
import { useEffect, useState } from "react";
import { type Album, fetchAlbums } from "~/app/api/album/albums";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function AlbumsPage() {
  const [albums, setAlbums] = useState<Album[]>([]);

  const loadAlbums = async () => {
    try {
      const albumsData = await fetchAlbums();
      setAlbums(albumsData);
    } catch (error) {
      console.error("Error fetching albums:", error);
    }
  };

  useEffect(() => {
    loadAlbums().catch(console.error);
  }, []);

  const updateAlbum = async () => {
    try {
      const response = await fetch("/api/updateAlbumId", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageId: 232,
          newAlbumId: 1,
        }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error updating album:", error);
    }
  };

  useEffect(() => {
    updateAlbum().catch(console.error);
  }, []);

  return (
    <div>
      <h1>Albums</h1>
      <ul className="flex gap-5">
        {albums.map((album) => (
          <li key={album.id}>
            <Link href={`/album/${album.name}`} passHref>
              <Button
                variant="secondary"
                className="h-10 w-20 items-center justify-center text-center hover:bg-gray-700"
              >
                {album.name}
              </Button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
