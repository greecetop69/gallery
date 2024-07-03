"use client";

import { SignedOut, UserButton, SignedIn, SignInButton } from "@clerk/nextjs";
import { SimpleUploadButton } from "./simpleUploadButton";

export function TopNav() {

    return (
      <nav className="flex w-full items-center justify-between border-b text-xl font-semibold p-4">
        <div className="">Gallery</div>
        <div className="flex flex-row">
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
              <SimpleUploadButton />
                <UserButton />
            </SignedIn>
        </div>
      </nav>
    );
  }
  