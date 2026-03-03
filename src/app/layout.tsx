import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BCC Cable Consulting",
  description: "Expert consulting in high-voltage cable systems",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
