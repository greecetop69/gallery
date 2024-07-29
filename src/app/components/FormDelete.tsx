"use client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "~/components/ui/button";

const FormDelete = ({
  imageId,
  closeDialog,
}: {
  imageId: number;
  closeDialog: () => void;
}) => {
  const t = useTranslations("HomePage");
  const router = useRouter();

  const onSubmit = async () => {
    await fetch("http://localhost:3000/api/deleteImage", {
      method: "post",
      body: JSON.stringify(imageId),
    });

    closeDialog();
    router.refresh();
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await onSubmit();
      }}
    >
      <Button type="submit" variant="destructive">
        {t("delete")}
      </Button>
    </form>
  );
};

export default FormDelete;