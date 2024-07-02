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
      <body>{children}</body>
    </html>
  );
}
