"use client";
import React from "react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import "~/styles/globals.css";

const LangSelect = () => {
  const locale = useLocale();
  const router = useRouter();

  const changeLocale = (lang: string) => {
    router.replace(`/${lang}`);
  };

  return (
    <Select defaultValue={locale} onValueChange={changeLocale}>
      <SelectTrigger className="!w-[70px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent style={{ minWidth: "70px", maxWidth: "70px" }}>
        <SelectItem style={{ minWidth: "70px", maxWidth: "70px" }} value="en">
          EN
        </SelectItem>
        <SelectItem style={{ minWidth: "70px", maxWidth: "70px" }} value="ru">
          RU
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LangSelect;
