export type Album = {
    id: number;
    name: string;
    createdAt: string;
    updatedAt?: string | null;
};

export async function fetchAlbums(): Promise<Album[]> {
    const response = await fetch('/api/album');
    if (!response.ok) {
        throw new Error("Failed to fetch albums");
    }
    return await response.json() as Album[];
}

export async function createAlbum(name: string): Promise<void> {
    const response = await fetch('/api/album', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
    });

    if (!response.ok) {
        throw new Error("Failed to create album");
    }
}

export async function addImageToAlbum(albumId: number, imageName: string, imageUrl: string): Promise<void> {
    const response = await fetch('/api/images', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ albumId, name: imageName, url: imageUrl }),
    });

    if (!response.ok) {
        throw new Error("Failed to add image to album");
    }
}