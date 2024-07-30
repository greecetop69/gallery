import { useRouter, usePathname } from "next/navigation";

const useChangeLocale = () => {
  const router = useRouter();
  const pathname = usePathname();

  const changeLocale = (lang: string) => {
    const newUrlParts = pathname.split("/");
    newUrlParts[1] = lang;
    const newUrl = newUrlParts.join("/");
    router.push(newUrl);
    router.refresh();
  };

  return changeLocale;
};

export default useChangeLocale;
