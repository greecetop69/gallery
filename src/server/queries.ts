import 'server-only';
import { db } from './db';
import { auth } from '@clerk/nextjs/server';
import { images, albums } from './db/schema'
import { eq, sql, and } from 'drizzle-orm';
import { redirect } from 'next/navigation';

export interface IImage {
    id: number;
    name: string;
    url: string;
    userId: string;
    albumId?: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
}
export interface IAlbum {
    id: number;
    name: string;
    userId: string;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export async function getMyImages(page = 1, pageSize = 11): Promise<{ images: IImage[], total: number }> {
    const user = auth();

    if (!user.userId) {
        return { images: [], total: 0 };
    }

    const offset = (page - 1) * pageSize;

    const userImages = await db.select().from(images)
        .where(eq(images.userId, user.userId))
        .orderBy(images.id)
        .offset(offset)
        .limit(pageSize);

    const total = await db.select({ count: sql`count(*)` })
        .from(images)
        .where(eq(images.userId, user.userId))
        .then(result => result[0]?.count as number);

    return { images: userImages, total };
}


export async function getImage(id: number) {
    const user = auth();
    if (!user.userId) throw new Error('Unauthorized');

    const image = await db.query.images.findFirst({
        where: (model, { eq }) => eq(model.id, id),
    });

    if (!image) redirect('/');

    if (image.userId !== user.userId) throw new Error('Unauthorized');

    return image;
}
export async function deleteImage(id: number) {
    const user = auth();
    if (!user.userId) throw new Error("Unauthorized");

    await db
        .delete(images)
        .where(and(eq(images.id, id), eq(images.userId, user.userId)));
}

export async function searchImagesByName(query: string) {
    const user = auth();

    if (!user.userId) {
        throw new Error("Unauthorized");
    }

    const images = await db.query.images.findMany({
        where: (model, { and, like }) => and(
            eq(model.userId, user.userId),
            like(model.name, `%${query}%`)
        ),
        orderBy: (model, { asc }) => asc(model.id),
    });

    return images;
}

export async function createAlbum(name: string, userId: string): Promise<IAlbum[]> {
    return await db.insert(albums).values({ name, userId }).returning() as IAlbum[];
}

export async function addImageToAlbum(imageId: number, albumId: number) {
    return await db.update(images)
        .set({ albumId })
        .where(eq(images.id, imageId))
        .returning();
}

export async function getImagesByAlbum(albumId: number, page = 1, pageSize = 11): Promise<{ images: IImage[], total: number }> {
    const user = auth();

    if (!user.userId) {
        return { images: [], total: 0 };
    }

    const offset = (page - 1) * pageSize;

    const albumImages = await db.select().from(images)
        .where(and(eq(images.userId, user.userId), eq(images.albumId, albumId)))
        .orderBy(images.id)
        .offset(offset)
        .limit(pageSize);

    const total = await db.select({ count: sql`count(*)` })
        .from(images)
        .where(and(eq(images.userId, user.userId), eq(images.albumId, albumId)))
        .then(result => result[0]?.count as number);

    return { images: albumImages, total };
}

export async function getAlbums() {
    try {
      return await db.select().from(albums);
    } catch (error) {
      console.error("Ошибка при получении альбомов", error);
      return [];
    }
  }