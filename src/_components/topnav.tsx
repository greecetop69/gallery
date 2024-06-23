import { SignedOut, UserButton, SignedIn, SignInButton } from "@clerk/nextjs";

export function TopNav() {
    return (
      <nav className="flex w-full items-center justify-between border-b text-xl font-semibold p-4">
        <div className="">Gallery</div>
        <div className="">
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
      </nav>
    );
  }
  