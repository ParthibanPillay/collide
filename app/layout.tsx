import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut, SignIn } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import { Montserrat } from "next/font/google"

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
    <html lang="en" suppressHydrationWarning className={montserrat.className}>
      <head />
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <ClerkProvider>
            <SignedOut>
              <SignIn routing="hash" />
            </SignedOut>
            <SignedIn>
              {children}
            </SignedIn>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>

  );
}
