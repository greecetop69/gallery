import { useRouter } from "next/navigation";
import { useUploadThing } from "~/utils/uploadthing";
import { toast } from "sonner";
import { usePostHog } from "posthog-js/react";
import { UploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "../app/api/uploadthing/core";
import { useCallback } from "react";
import { LoadingSpinnerIcon } from "~/app/icons/LoadingSpinnerIcon";

type Input = Parameters<typeof useUploadThing>;

const useUploadThingInputProps = (...args: Input) => {
  const $ut = useUploadThing(...args);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      try {
        const result = await $ut.startUpload(acceptedFiles);
        console.log("uploaded files", result);
      } catch (error) {
        console.error("Upload error:", error);
      }
    },
    [$ut],
  );

  return {
    onDrop,
    isUploading: $ut.isUploading,
  };
};

export function SimpleUploadDragAndDrop() {
  const router = useRouter();
  const posthog = usePostHog();

  const { onDrop } = useUploadThingInputProps("imageUploader", {
    onUploadBegin() {
      posthog.capture("upload-begin");
      toast(
        <div className="flex items-center gap-2 text-white">
          <LoadingSpinnerIcon /> <span className="text-lg">Uploading...</span>
        </div>,
        {
          duration: 5000,
          id: "upload-begin",
        },
      );
    },
    onClientUploadComplete() {
      toast.dismiss("upload-begin");
      toast("Upload complete!");
      router.refresh();
    },
    onUploadError(e) {
      toast.error("Upload Error!");
      console.log(e);
    },
  });

  return (
    <UploadDropzone<OurFileRouter, "imageUploader">
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        console.log("Files: ", res);
        alert("Upload Completed");
      }}
      onUploadError={(error: Error) => {
        alert(`ERROR! ${error.message}`);
        console.error("Upload error:", error);
      }}
      onUploadBegin={(name) => {
        console.log("Uploading: ", name);
      }}
      onDrop={onDrop}
      className="relative !mt-0 flex !h-[192px] !w-[192px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-blue-500 bg-gray-800 p-6 text-white hover:border-blue-700"
      appearance={{
        container: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
        },
        uploadIcon: {
          position: "absolute",
          fontSize: "1rem",
          color: "white",
        },
        label: {
          display: "none",
        },
        allowedContent: {
          display: "none",
        },
        button: {
          display: "none",
        },
      }}
    />
  );
}
