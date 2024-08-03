import { ThemeProvider } from "next-themes";
import { ClerkProvider } from "@clerk/nextjs";
import { TopNav } from "~/app/components/topbar/TopNav";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { Toaster } from "~/components/ui/sonner";
import { CSPostHogProvider } from "./_analytics/provider";
import LocaleLayout from "./[locale]/layout";

export const metadata = {
  title: "Create T3 Gallery",
  description: "Generated by greecetop",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <LocaleLayout params={{ locale: params.locale }}>
      <ClerkProvider>
        <CSPostHogProvider>
          <html lang={params.locale} className="dark">
            <body className="flex flex-col gap-4 bg-background text-foreground">
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
                <div className="grid-rows-[auto,1fr]">
                  <TopNav />
                  <main className="overflow-y-auto">{children}</main>
                </div>
                <Toaster />
              </ThemeProvider>
            </body>
          </html>
        </CSPostHogProvider>
      </ClerkProvider>
    </LocaleLayout>
  );
}
