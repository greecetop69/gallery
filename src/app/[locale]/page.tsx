import { type IImage, getMyImages } from "~/server/queries";
import { AllImages } from "../components/AllImages";
import { auth } from "@clerk/nextjs/server";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { useTranslations } from "next-intl";

type User = {
  userId: string;
};

export const dynamic = "force-dynamic";

export default async function HomePageWrapper() {
  const images = (await getMyImages()) as IImage[];
  const { userId, ...user } = auth() as User;

  return <HomePage images={images} user={{ userId, ...user }} />;
}

function HomePage({ images, user }: { images: IImage[]; user: User }) {
  const t = useTranslations("HomePage");

  if (!user.userId) {
    return (
      <div className="flex items-center justify-center">
        <span className="text-2xl text-bold ">{t("no_auth")}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">{t("title")}</div>
      </SignedOut>
      <SignedIn>
        <AllImages images={images} />
      </SignedIn>
    </div>
  );
}
