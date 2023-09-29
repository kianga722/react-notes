import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "React Notes for memo, useMemo, and useCallback",
  description:
    "Reference and Examples of using React memo, useMemo, and useCallback for optimization",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
