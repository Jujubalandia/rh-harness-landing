import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "rn-harness — Ship a React Native app to both stores in 20 days",
  description:
    "Not another boilerplate. rn-harness is the whole assembly line — spec, UX, dev, QA, store, marketing — wired into skills, quality gates and a wizard that reads your package.json and sets the rest up for you.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* App Router layout, not pages/_document — the no-page-custom-font rule doesn't apply here. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
