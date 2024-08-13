import { NextResponse } from 'next/server';
import { db } from '~/server/db';
import { albums } from '~/server/db/schema';

export async function POST(req: Request) {
    try {
        // Явное приведение типа при получении данных из JSON
        const { name } = await req.json() as { name: string };

        if (!name || name.trim() === '') {
            return NextResponse.json({ error: 'Album name is required' }, { status: 400 });
        }

        const newAlbum = await db.insert(albums).values({ name }).returning();
        return NextResponse.json(newAlbum, { status: 201 });
    } catch (error) {
        console.error("Error creating album:", error);

        // Проверка типа error и безопасное использование
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const allAlbums = await db.select().from(albums);
        return NextResponse.json(allAlbums, { status: 200 });
    } catch (error) {
        console.error("Error fetching albums:", error);

        // Проверка типа error и безопасное использование
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
    }
}
