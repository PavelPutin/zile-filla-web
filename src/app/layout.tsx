import Header from "@/components/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zile Filla",
  description: "Server file system viewer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header>
          <Header />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
