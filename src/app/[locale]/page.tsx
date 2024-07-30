import { type IImage, getMyImages } from "~/server/queries";
import { auth } from "@clerk/nextjs/server";
import { HomePageClient } from "../components/HomePageClient";

type User = {
  userId: string;
};

export const dynamic = "force-dynamic";

export default async function Page() {
  const images = (await getMyImages()) as IImage[];

  const authData = auth();
  const userId = authData.userId ?? "";

  const user: User = { userId };

  return <HomePageClient images={images} user={user} />;
}
