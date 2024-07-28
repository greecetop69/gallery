import { SignedIn, SignedOut } from "@clerk/nextjs";
import { IImage, getMyImages } from "~/server/queries";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import FullPageImageView from "./components/FullPageImageView";
import { AllImages } from "./components/AllImages";

export const dynamic = "force-dynamic";

// async function Images() {
//   const images= await getMyImages() as IImage[];

//   return (
//     <div className="flex flex-wrap justify-center gap-4 p-4">
     
//     </div>
//   );
// }

export default async function HomePage() {
  const t = useTranslations("HomePage");
  return (
    <main>
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">{t("title")}</div>
      </SignedOut>
      <SignedIn>
        {/* <Images /> */}
      </SignedIn>
    </main>
  );
}
