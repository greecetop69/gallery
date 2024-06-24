"use client";

import { SignedOut, UserButton, SignedIn, SignInButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { UploadButton } from "~/utils/uploadthing";

export function TopNav() {
  const Router = useRouter();

    return (
      <nav className="flex w-full items-center justify-between border-b text-xl font-semibold p-4">
        <div className="">Gallery</div>
        <div className="flex flex-row">
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
              <UploadButton endpoint="imageUploader" onClientUploadComplete={ () => {Router.refresh();} } />
                <UserButton />
            </SignedIn>
        </div>
      </nav>
    );
  }
  