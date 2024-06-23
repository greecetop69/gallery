import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

async function Image() {
  const images = await db.query.images.findMany({
    orderBy: (model, {asc}) => asc(model.id),
  });

  return (
    <div className="flex flex-wrap gap-4">
    {images.map((image) => (
      <div key={image.id} className="flex w-48 flex-col">
        <img src={image.url} alt={`image ${image.id}`} />
        <div>{image.name}</div>
      </div>
    ))}
  </div>
  );
}

export default async function HomePage() {
  return (
    <main className="">
      <SignedOut>
        <div className="w-full h-full text-2xl text-center">Please sign in above</div>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <Image />
      </SignedIn>
    </main>
  );
}
