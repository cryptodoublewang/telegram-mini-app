import type { Metadata } from "next";
import Providers from "./providers";
import fontStyles from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kelp Telegram Mini App",
  description: "Welcome to the Kelp Telegram Mini App!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={fontStyles as {}}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
