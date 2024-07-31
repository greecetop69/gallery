import { getMyImages } from "~/server/queries";
import { auth } from "@clerk/nextjs/server";
import { HomePageClient } from "../components/images-view/HomePageClient";

type User = {
  userId: string;
};

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: {
    page?: string;
    pageSize?: string;
  };
}

export default async function Page({ searchParams }: PageProps) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const pageSize = searchParams.pageSize ? parseInt(searchParams.pageSize) : 11;

  const { images, total } = await getMyImages(page, pageSize);
  const pageCount = Math.ceil(total / pageSize);

  const authData = auth();
  const userId = authData.userId ?? "";
  const user: User = { userId };

  return (
    <>
      <HomePageClient images={images} user={user} pageCount={pageCount} />
    </>
  );
}
