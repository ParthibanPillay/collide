import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut, SignIn } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import { Montserrat } from "next/font/google"
import { Providers } from "./providers";

const montserrat = Montserrat({
  subsets: ['latin'], // or ['latin-ext'], ['cyrillic'], etc.
  weight: ['400', '500', '600', '700'], // choose weights you need
  display: 'swap',
  variable: '--font-montserrat', // optional: for CSS variable
});

export const metadata: Metadata = {
  title: "Collide",
  description: "Your personal space for files",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark" suppressHydrationWarning>
        <body
          className={`${montserrat.variable} antialiased bg-background text-foreground`}
        >
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>

  );
}
