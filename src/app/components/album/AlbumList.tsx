"use client";
import { useEffect, useState } from "react";
import type { IAlbum } from "~/server/queries"; // Assume you have an IAlbum type defined in your queries file
import { clerkClient } from "@clerk/nextjs/server";
import { useTranslations } from "next-intl";

type User = {
  username: string;
};

type AlbumListProps = {
  albums: IAlbum[];
};

export default function AlbumList({ albums }: AlbumListProps) {
  const [uploaderInfo, setUploaderInfo] = useState<{ [key: number]: User | null }>({});
  const t = useTranslations("AlbumPage");

  useEffect(() => {
    async function fetchUploaderInfo() {
      try {
        const users = await Promise.all(
          albums.map((album) => clerkClient.users.getUser(album.userId))
        );
        const uploaderInfoMap = albums.reduce((acc, album, index) => {
          acc[album.id] = users[index] as User;
          return acc;
        }, {} as { [key: number]: User | null });
        setUploaderInfo(uploaderInfoMap);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    }

    void fetchUploaderInfo();
  }, [albums]);

  return (
    <div>
      <h1>Album List</h1>
      <ul>
        {albums.map((album) => {
          const uploader = uploaderInfo[album.id];
          const createdAtDate = album.createdAt ? new Date(album.createdAt) : null;
          const createdAtString = createdAtDate
            ? createdAtDate.toLocaleDateString()
            : "N/A";

          return (
            <li key={album.id}>
              <div>ID: {album.id}</div>
              <div>Name: {album.name}</div>
              <div>User ID: {album.userId}</div>
              <div>Created At: {createdAtString}</div>
              <div>Updated At: {album.updatedAt ? new Date(album.updatedAt).toLocaleDateString() : "N/A"}</div>
              <div>Uploader: {uploader ? uploader.username : "Loading..."}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
